#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n,m;
    int a,b;
    cin>>n>>m;
    int total=0;
    int p=pow(n,0.5);
    int q=pow(m,0.5);
   
    for ( a = 0; a < p+1; a++)
    {
        for ( b = 0; b< q+1; b++)
        {
            
           
            if(pow(a,2)+b==n)
            {
                
                if(pow(b,2)+a==m)
                {
                total++;
                break;
                }
            }
        }
        
    }
    cout<<total;
    return 0;
}