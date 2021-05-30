import sys
import pandas as pd
import os

request_row_id = int(sys.argv[1])
cur_path = os.getcwd()
parent = os.path.dirname(cur_path)
request_path = os.path.join(parent, "api\\views\\exchange_slot\\exchange.csv")


request_df = pd.read_csv(request_path, header = 0, index_col=None)
request_df.drop(index=request_row_id, inplace=True)

for i in range(request_row_id+1, len(request_df)+1):
    request_df.loc[i,'ID'] = int(request_df.loc[i,'ID']) - 1

request_df.to_csv(request_path, index=False)
