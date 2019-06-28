/**
Looping a triangle

Write a loop that makes seven calls to console.log 
to output the following triangle:

#
##
###
####
#####
######
#######
*/

for (var i = 1; i <= 7; i++) {
    var t = '';
    for (var j = 0; j < i; j++) {
        t += '#';
    }
    console.log(t);
}