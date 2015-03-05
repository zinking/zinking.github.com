#!/bin/sh
#
# File: sum_stats.sh
#

clang sum100000000.cpp

echo "C"

time ./a.out

gcc sum100000000.cpp -o ./ac.out

echo "C gcc"

time ./ac.out

javac sum100000000.java

echo "java"

time java sum100000000

echo "mono"

time mono sum100000000.exe

echo "ruby"

time ruby sum100000000.rb



