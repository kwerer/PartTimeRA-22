from TikTokApi import TikTokApi
api = TikTokApi()

results = 10

trending = api.trending(count=results)

for tiktok in trending:
    # Prints the id of the tiktok
    print(tiktok['id'])

print(len(trending))