---
layout: post
title: 'spark introduction'
categories: frontend
---

<!-- ---
layout: post
title: 'Spark Introduction'
categories: bigdata
tag: [spark]
--- -->

# Spark

## History

## Motivations

## RDDs

> Resilient Distributed Datasets (RDDs)

## MapReduce vs Spark

![图 12-1704816442312](../../../images/2024-01-09-01_introduction-11b3d2363c7ac34cfa5fdd31488fd6fa14004bcbe9e3cee49afd51b12c219af9.png)

## Spark Main Components

![图 13-1704816508591](../../../images/2024-01-09-01_introduction-d6264181f49453acd2a12b4efe6a010182f46c53d57456f161318264099c2777.png)

### Spark Core

### Spark SQL structured data

### Spark Streaming real-time

#### process live streams of data in real-

time

### MLlib

#### machine learning/data mining library

## Spark Basic Concepts

### Resilient Distributed Data Sets

### Spark Framework

### Structure of Spark programs

#### The Driver program

#### Deploy mode

- cluster mode, the framework launches the driver inside of
  the cluster
- client mode, the submitter launches the driver outside of the cluster

#### Stage

- Each job gets divided into smaller sets of tasks called
  stages
- The output of one stage is the input of the next stage(s)
- The shuffle operation is always executed between two stages
  - Shuffleisaheavyoperation

## Example

### Count line

```java
public static void main(String[] args) {
    String inputFile;
    long numLines;

    inputFile=args[0];

    SparkConf conf = new SparkConf().setAppName("Spark Line Count");

    JavaSparkContext sc = new JavaSparkContext(conf);

    JavaRDD<String> lines = sc.textFile(inputFile);

    numLines = lines.count();

    System.out.println("Number of lines="+numLines);

    sc.close();
}
```

- Local variables
  > Can be used to store only “small” objects/data
- RDDs
  > Are used to store “big/large” collections of objects/data in the nodes of the cluster

### Word Count

```java
public static void main(String[] args) {
    String inputFile=args[0];
    String outputPath=args[1];

    SparkConf conf=new SparkConf().setAppName("Spark Word Count");
    JavaSparkContext sc = new JavaSparkContext(conf);

    JavaRDD<String> lines=sc.textFile(inputFile);
    JavaRDD<String> words =
lines.flatMap(line -> Arrays.asList(line.split("\\s+")).iterator());
    JavaPairRDD<String, Integer> words_one = words.mapToPair(word -> new Tuple2<String, Integer>(word.toLowerCase(), 1));
    JavaPairRDD<String, Integer> counts = words_one.redueByKey((c1, c2) -> c1 + c2);

    counts.saveAsTextFile(outputPath);
    sc.close();

}
```

## Spark-submit

- --master option

  - spark://host:port
  - mesos://host:port
  - yarn
  - local

- --deploy-mode option
  - client
    > The driver is launched locally (in the “local” PC executing spark-submit)
  - cluster
    > The driver is launched on one node of the cluster

```shell
spark-submit --class it.polito.spark.DriverMyApplication --deploy-mode cluster --master yarn MyApplication.jar arguments

spark-submit --class it.polito.spark.DriverMyApplication --deploy-mode client --master local MyApplication.jar arguments
```
