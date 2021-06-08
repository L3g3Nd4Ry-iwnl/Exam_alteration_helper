import sys
import pandas as pd
import os

request_row_id = int(sys.argv[1])
cur_path = os.getcwd()
parent = os.path.dirname(cur_path)
request_path = os.path.join(cur_path, "views\\exchange_slot\\exchange.csv")


request_df = pd.read_csv(request_path, header = 0, index_col=None)
request_df_list = request_df.values.tolist()
requester_row = int(request_df_list[request_row_id][3])
accepter_row = int(request_df_list[request_row_id][4])
filename = request_df_list[request_row_id][18]
request_df.drop(index=request_row_id, inplace=True)

for i in range(request_row_id+1, len(request_df)+1):
    request_df.loc[i,'ID'] = int(request_df.loc[i,'ID']) - 1

request_df.to_csv(request_path, index=False)

make_path = os.path.join(cur_path, "views\\hall_allocation", filename)

make_change_df = pd.read_csv(make_path, header = 0, index_col=None)

exchange_1 = []
exchange_2 = []

exchange_1.append(make_change_df.loc[requester_row, 'Facultyname'])
exchange_1.append(make_change_df.loc[requester_row, 'Facultyemail'])

exchange_2.append(make_change_df.loc[accepter_row, 'Facultyname'])
exchange_2.append(make_change_df.loc[accepter_row, 'Facultyemail'])

make_change_df.loc[requester_row, 'Facultyname'] = exchange_2[0]
make_change_df.loc[requester_row, 'Facultyemail'] = exchange_2[1]

make_change_df.loc[accepter_row, 'Facultyname'] = exchange_1[0]
make_change_df.loc[accepter_row, 'Facultyemail'] = exchange_1[1]

make_change_df.to_csv(make_path, index=False)
