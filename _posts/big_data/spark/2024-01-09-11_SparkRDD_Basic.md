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
