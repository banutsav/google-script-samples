# Python program to return title to result  
# of excel sheet.  
  
# Returns resul when we pass title.  
def titleToNumber(s): 
    # This process is similar to binary-to-  
    # decimal conversion  
    result = 0
    for B in range(len(s)):  
        result *= 26
        result += ord(s[B]) - ord('A') + 1
    result -= 1
    return result  
  
# Driver function
data = ['CG']
result = []
for x in data:
	result.append(titleToNumber(x))
print(result)
# , 'person': 'assigned'}
