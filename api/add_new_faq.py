import sys
import pandas as pd
new_faq = pd.read_csv("new_faq.csv",index_col=0)
temp_dict = {'name':sys.argv[1],'email':sys.argv[2],'question':sys.argv[3]}
new_faq = new_faq.append(temp_dict, ignore_index=True)
new_faq.to_csv("new_faq.csv")
print('inserted in faq')