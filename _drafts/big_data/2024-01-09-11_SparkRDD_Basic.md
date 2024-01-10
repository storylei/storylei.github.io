---
layout: post
title: "Spark Introduction"
categories: bigdata
tag: [spark, rdd]
---

# RDD-based programming

## Spark context

```java
// Create a configuration object, and set the name of the application
SparkConf conf = new SparkConf().setAppName("SparkApp");
// Create a Spark Context object
JavaSparkContext sc = new JavaSparkContext(conf);
```

## RDD basics

- A Spark RDD is an immutable distributed collection of objects
- Each RDD is split in partitions, Code is executed on each partition in isolation

### RDD: create and save

#### Create

1. Create RDDs from files

```java
// Build an RDD of Strings from the input textual file
// The number of partitions is manually set to 5
// Each element of the RDD is a line of the input file
JavsRDD<String> lines = sc.textFile(inputFile, 5);
// The data is lazily read from the input file only when the data is needed (i.e., when an action is applied on the lines RDD, or on one of its “descendant” RDDs)
```

2. Create RDDs from a local Java collection

```java
// Create a local Java list
List<String> inputList = Arrays.asList("First element", "Second element", "Third element");
// Build an RDD of Strings from the local list.
// The number of partitions is set automatically by Spark or set by the 2nd parameter
// There is one element of the RDD for each element of the local list
JavaRDD<String> distList = sc.parallelize(inputList, 3);
//  No computation occurs when sc.parallelize() is invoked
```

#### Save RDDs

1. Save in a textual(HDFS) file

```java
// Store the lines RDD in the output textual file
// Each element of the RDD is stored in a line of the output file
lines.saveAsTextFile(outputPath);
//  The content of lines is computed when saveAsTextFile() is invoked
```

2. Store in local Java variables

> Pay attention to the size of the RDD

```java
// Retrieve the content of the lines RDD and store it in a local Java collection
// The local Java collection contains a copy of each element of the RDD
List<String> contentOfLines = lines.collect();

```

### Transformations and Actions

#### Transformations

- operations on RDDs that return a new RDD
- computed lazily

#### Actions

- Return results to the Driver program
- Or write the result in the storage (output file/folder)

#### Passing functions to Transformations and Actions

![图 0-1704879371129](../../images/2024-01-09-11_SparkRDD_Basic-6f20de15b50e51ac07473ae65ee3cf898df15820f35813f047f9bfbfe3f0a06c.png)

1. Solution based on named classes

```java
// Define a class implementing the Function interface
class ContainsError implements Function<String, Boolean> {
    // Implement the call method
    public Boolean call(String x) {
        return x.contains("error");
    }
}
// Select the rows containing the word “error”
JavaRDD<String> errorsRDD = inputRDD.filter(new ContainsError());
```

2. Solution based on anonymous classes

```java
// Select the rows containing the word “error”
JavaRDD<String> errorsRDD = inputRDD.filter(
    new Function<String, Boolean>() {
        public Boolean call(String x) {
            return x.contains("error");
        }
} );
```

3. Solution based on lambda functions

```java
// Select the rows containing the word “error”
JavaRDD<String> errorsRDD = inputRDD.filter(x -> x.contains("error"));
```

### Basic Transformations

#### Filter transformation

```java
List<Integer> inputList = Arrays.asList(1, 2, 3, 4);
JavaRDD<Integer> inputRDD = sc.parallelize(inputList);
JavaRDD<Integer> resRDD = inputRDD.filter(n -> n > 2);
```

#### Map transformation

```java
JavaRDD<String> inputRDD = sc.textFile('username.txt');
JavaRDD<Integer> lenRDD = inputRDD.map(e -> new Integer(e.length));
```

#### FlatMap transformation

- Duplicates are not removed
- `public Iterable<R> call(T element)` mehtod of the `FlatMapFunction<T, R>` interface must be implemented

```java
JavaRDD<String> inputRDD = sc.textFile("document.txt");
JavaRDD<String> listOfWordsRDD = inputRDD.flatMap(x -> Arrays.asList(x.split(" ")).iterator());
```

#### Distinct transformation

- A shuffle operation is executed for computing the
  result of the distinct transformation
- The shuffle operation is used to repartition the input data

```java
JavaRDD<String> inputRDD = sc.textFile("names.txt");
JavaRDD<String> distinctNamesRDD = inputRDD.distinct();
```

#### Sample transformation

- withReplacement 参数用于指定是否允许重复抽样。
  - 如果 withReplacement 为 true，则每个元素都有可能被抽中多次；
  - 如果 withReplacement 为 false，则每个元素只能被抽中一次。
- fraction 参数用于指定抽样比例。
  - 如果 fraction 为 0，则表示不进行抽样，返回原始 RDD。
  - 如果 fraction 为 1，则表示返回整个 RDD。
  - 如果 fraction 介于 0 和 1 之间，则表示返回 RDD 的 fraction 比例的元素。

```java
JavaRDD<String> inputRDD = sc.textFile("sentences.txt");
JavaRDD<String> randomSentencesRDD = inputRDD.sample(false,0.2);
```

#### Set Transformations

1. Union
2. Intersection
3. Subtract
4. Cartesian
