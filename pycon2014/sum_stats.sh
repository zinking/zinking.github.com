#!/bin/sh
#
# File: sum_stats.sh
#

clang sum100000000.cpp

time ./a.out

gcc sum100000000.cpp -o ./ac.out

time ./ac.out

javac sum100000000.java

time java sum100000000

time ruby sum100000000.rb



