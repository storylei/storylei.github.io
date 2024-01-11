---
layout: post
title: "Spark PairRDD"
categories: bigdata
tag: 'spark'
---

# Pair RDDs

## Creating Pair RDDs

### MapToPair transformation

### flatMapToPair transformation

### parallelizePairs method

## Transformations on Pair RDDs

### ReduceByKey

### FoldByKey

### CombineByKey

### GroupByKey

### MapValues

### flatMapValues

### Keys

### Values

### SortByKey

### Summary

innputRDD1 = {(“k1”, 2), (“k3”, 4), (“k3”, 6)}

![图 0-1705005984518](../../images/2024-01-11-12_SparkRDD_PairRDD-e8d946809bd43f1079e8873cd06e7aef9c7c2a042e7531e95b70750acf5ddbce.png)

![图 1-1705006001491](../../images/2024-01-11-12_SparkRDD_PairRDD-bf2fd77428366462be9a82a0a5d50dff7e27321154edd3b179ec96441764da5c.png)

![图 2-1705006016036](../../images/2024-01-11-12_SparkRDD_PairRDD-5835c4b0738134ced259901d362cdd0b86f1ca8f9630850cf05eca26345b2d3a.png)

![图 3-1705006033431](../../images/2024-01-11-12_SparkRDD_PairRDD-9e55bff7bbb19ece7daa21994e8c1e5d46edec9e9e85175e1f2c5e8070d21778.png)

![图 4-1705006046657](../../images/2024-01-11-12_SparkRDD_PairRDD-2f8840df003daad9c87f93dda59f9c4b5e51e8c7d9a6abdaa6a42d9cf85f26ef.png)

![图 5-1705006058929](../../images/2024-01-11-12_SparkRDD_PairRDD-c7a54103c5231f9d5d7f081fa1c5ceeae013bbaff69e8d8f85faacc6dd71c70c.png)

## Transforations on two Pair RDDs

### SubtractByKey

### Join

### CoGroup

### Summary

inputRDD1 = {(“k1”, 2), (“k3”, 4), (“k3”, 6)}
inputRDD2 = {(“k3”, 9)}

![图 6-1705006204781](../../images/2024-01-11-12_SparkRDD_PairRDD-decabebdf1df632df3461847d85985f38f1b0eb60631dbe46d794a2da1b88457.png)

![图 7-1705006215575](../../images/2024-01-11-12_SparkRDD_PairRDD-70446d9543ad39f442c46ac5fb8665b94b89fbb84413ed3d6670c730b06a3b41.png)

## Actions on Pair RDDs

### CountByKey

### CollectAsMap

### Lookup

### Summary

inputRDD1 = {(“k1”, 2), (“k3”, 4), (“k3”, 6)}

![图 8-1705006317076](../../images/2024-01-11-12_SparkRDD_PairRDD-02352078cbcfecf34c396a044b3b1ffd6171d68689aa7d710266acafacc69d70.png)

![图 9-1705006331899](../../images/2024-01-11-12_SparkRDD_PairRDD-b9165b0fb9e9cbfd1c2f4bb763b6d931ba5023d94bea7cfd71cb0eb52b46a75b.png)
