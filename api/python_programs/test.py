"""
import pandas as pd

filename = '2018_endsemester_cse.csv'
df = pd.read_csv(r'../views/hall_allocation/'+filename, header = 0, index_col=0)

print(df.head())
print(df.shape)
print(df[0:1])
df.drop(0, inplace=True)
print(df.head())
print(df.shape)

temp = df[0:1]
print(temp['Facultyname'])
print()

temp_dict = df.to_dict('index')
print(temp_dict)

print()
print(temp_dict[0]['Facultyname'])
df.loc[0,'Facultyname'] = 'Aads'

print(df.head())

import sys
print("Output from Python")
print("First name: " + sys.argv[1])

"""

import os

path = os.getcwd()
parent = os.path.dirname(path)
print("Parent directory", parent)
print(os.path.join(parent, "views\\exchange_slot\\exchange.csv"))

