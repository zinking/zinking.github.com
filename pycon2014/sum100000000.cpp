#include <cstdio>

using namespace std;

int main(){
  long N=1000000000,sum=0;
  for( long i=0; i<N; i++ ) sum+= i;
  printf("%ld\n",sum);
}
