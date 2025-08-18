-> Retirer l'option "médiane" "moyenne" et garder l'option recommandée

CREATOR ->
Passer les mots clés avant les paramètres géographiques


De manière générale, voir la recherche comme l'utilisation de filtres du plus "général" au plus "précis"

Par exemple, la thématique du compte (bio, mots clés dans la bio) en tout premier dans la partie "Créateur", c'est la "base" du filtrage, puis les champs plus spécifiques (âge ? etc etc) -> Top - Down

Met toi dans la peau d'une marque, d'un influencer marketing manager, qui recherche des influenceurs aec lesquels travailler pour des contenus sponsorisés sur les différents réseaux sociaux pour trier pertinemment les champs de recherche

-----

# Search Influencers

Get a list of influencers that match your filters.
			A successful request costs 0.01 credits per search result, with a typical request totaling 0.15 credits for up to 15 results per page
			Filtering and adding match data:Expand to see additional information
			When filtering by one or more fields, it is advisable to include these same fields in the sorting process. This ensures that you can retrieve the match information associated with each result.
			By adding the filtering fields to the sorting criteria, you gain access to detailed match info for every result obtained.
			Example: If you want to filter by age you would also sort the results by age:
			
			{
				&nbsp; "sort": { "direction": "desc", "field": "audience_age", "sortedValue": "18-24", "value": "18-24" },
				&nbsp; "page": 0,
				&nbsp; "filter": { "audience": { "age": [{"id": "18-24", "weight": 0.3}] } }
			}
			
			You will retrieve match info that will provide details on how well each result matches the filtering criteria. The match info should include two fields: 
			&nbsp;-code: represents the filtering field that corresponds to the result 
			&nbsp;-percentage: quantifies the degree of similarity or relevance 
			Audience filters support weights:Expand to see additional informationWeights allow you to set a threshold for the chosen filter. If you remove the weight - we will apply the default weight per filter.
			Using multiple filters simultaneously results in a logical AND, while applying multiple objects into an array (works with location and age) are applied as a logical OR
			Example: If you want at least 30% of the audience to be at the age of 18-24, you can use the weight property of 0.3. We recommend starting with low weight and gradually increasing the percentage. You can find the default thresholds in the notes of each filter.
			Expand the filter object below to see all available options.
			

Endpoint: POST /youtube/search
Security: accessToken

## Request fields (application/json):

  - `page` (number)
    Page number

  - `calculationMethod` (string)
    If specified, this indicates the method used to compute average-based metrics, such as average number of likes, comments, shares, etc.
    Enum: "median", "average"

  - `sort` (object)
    Sorting

  - `sort.field` (string, required)
    Note: The following sort options are available only when the corresponding filter is applied:       . 
		Sorting field in which order you want to get the results.
    Enum: "engagements", "followers", "engagementRate", "keywords", "audienceGeo", "audienceLang", "audienceGender", "audienceAge", "relevance", "followersGrowth", "views", "viewsGrowth"

  - `sort.value` (number)
    Only required for  sorting.
    Example: 123

  - `sort.direction` (string)
    Sorting direction
    Enum: "asc", "desc"

  - `filter` (object)

  - `filter.influencer` (object)

  - `filter.influencer.followers` (object)
    We round followers value in the filter: whenever it's below 5k, we round it to the nearest thousand (4123 -> 4000; 4800-> 5000); when it's over 5k, we round it to the nearest 5,000 (27k -> 25k; 28k -> 30k).
    Example: {"min":20000,"max":70000}

  - `filter.influencer.followers.min` (number)
    Minimum follower count.
    Example: 20000

  - `filter.influencer.followers.max` (number)
    Maximum follower count.
    Example: 70000

  - `filter.influencer.engagementRate` (number)
    Minimum engagement rate.
    Example: 0.02

  - `filter.influencer.location` (array)
    Filter by Influencer Location, You can get the locations with our locations api end point and send location ids in an array.
    Example: [148838,62149,80500,1428125,304716]

  - `filter.influencer.language` (string)
    Filter by Influencer Language, You can get the languages code with our languages api end point.
    Example: "en"

  - `filter.influencer.lastposted` (number)
    Idenitfy influencers based on when they last posted. The number represents days and should be >= 30.
    Example: 90

  - `filter.influencer.relevance` (array)
    Filter by topic of influencers posts or by similarity of topic to other influencer. For example "#cars #audi @topgear" means "Writing about #cars and #audi, has similar topic as @topgear account." You can only enter 100 usernames.
    Example: ["#cars","@topgear"]

  - `filter.influencer.audienceRelevance` (array)
    Filter by similarity of influencer's audience to another influencer's audience. For example "@topgear" means "Has audience similar to @topgear account." Audience similarity means followers follow accounts with the same topics as those followed by @topgear's audience.
    Example: ["@topgear"]

  - `filter.influencer.gender` (string)
    Filter by Influencer gender.
    Enum: "MALE", "FEMALE", "KNOWN", "UNKNOWN"

  - `filter.influencer.age` (object)
    Filter by Influencer age, possible values are: 18, 25, 35, 45, 65. You have the option to utilize either the  field, the  field, or both concurrently. Any number that falls outside the accepted range will be disregarded.

  - `filter.influencer.age.min` (number)
    Minimum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.age.max` (number)
    Maximum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.followersGrowthRate` (object)
    Growth rate by followers over a period of time.
    Example: {"interval":"i6months","value":0.01,"operator":"gt"}

  - `filter.influencer.followersGrowthRate.interval` (string, required)
    Specifies the interval of time in which growth occurred.
    Enum: "i1month", "i2months", "i3months", "i4months", "i5months", "i6months"

  - `filter.influencer.followersGrowthRate.value` (number)
    Weight of growth rate.
    Example: 0.01

  - `filter.influencer.followersGrowthRate.operator` (string, required)
    Operator used for comparison.
    Enum: "gte", "gt", "lt", "lte"

  - `filter.influencer.bio` (string)
    Search influencer by their bio description and/or full name
    Example: "photos videos"

  - `filter.influencer.views` (object)
    Filter by average views.

  - `filter.influencer.views.min` (number)
    Minimum views count.
    Example: 5000

  - `filter.influencer.views.max` (number)
    Maximum views count.
    Example: 10000

  - `filter.influencer.hasContactDetails` (array)
    If Influencer has contact details.

  - `filter.influencer.hasContactDetails.contactType` (string, required)
    Specifies the contact channels of an influencer.
    Enum: "bbm", "email", "facebook", "instagram", "itunes", "kakao", "kik", "lineid", "linktree", "pinterest", "sarahah", "sayat", "skype", "snapchat", "tiktok", "tumblr", "twitchtv", "twitter", "vk", "wechat", "youtube"

  - `filter.influencer.hasContactDetails.filterAction` (string)
    Defines condition enforced by the filter - "must" include, "should" include, or must "not" include.
    Enum: "must", "should", "not"

  - `filter.influencer.keywords` (string)
    Identify influencers by a phrase they use when speaking in their videos.
    Example: "cats"

  - `filter.influencer.isVerified` (boolean)
    Set to  to filter by verified influencers.

  - `filter.influencer.isOfficialArtist` (boolean)
    Filter by isOfficialArtist.

  - `filter.influencer.viewsGrowthRate` (object)
    Growth rate by total views over a period of time.
    Example: {"interval":"i1month","value":0.2,"operator":"gt"}

  - `filter.influencer.engagements` (object)
    Filter by engagements count. Pro tip: set  to 0 if you want to see results with hidden likes.

  - `filter.influencer.engagements.min` (number)
    Minimum engagements count (this value will be rounded).
    Example: 5000

  - `filter.influencer.engagements.max` (number)
    Maximum engagements count (this value will be rounded).
    Example: 10000

  - `filter.influencer.filterOperations` (array)
    Modify filter operation to use , , or . Example: Search for influencer using the keyword  AND  from the London or Female  interested in Beauty & Cosmetics.If no operator is specified, the default operator applied is the  operator.

  - `filter.influencer.filterOperations.operator` (string, required)
    Logical operations used to combine filters.Note: To use the  operator, you must apply it to at least two filters.
    Enum: "and", "or", "not"

  - `filter.influencer.filterOperations.filter` (string, required)
    Filter to apply the operation on. If  or  are specified then you can not sort by these fields.
    Enum: "followers", "engagements", "engagementRate", "lastposted", "bio", "keywords", "relevance", "language", "gender", "age", "location", "isVerified", "isOfficialArtist", "views"

  - `filter.audience` (object)

  - `filter.audience.location` (array)
    Filter by Audience Location, You can get the locations with our locations api end point and send location ids in an array together with their weight percentages. The default percentage is set to 20% (0.2)
    Example: [{"id":148838,"weight":0.2},{"id":62149,"weight":0.2},{"id":80500,"weight":0.2},{"id":1428125,"weight":0.2},{"id":304716,"weight":0.2}]

  - `filter.audience.location.weight` (number)
    Weight of filter.
    Example: 0.4

  - `filter.audience.location.id` (number, required)
    Filter value id for location (e.g. 148838)

  - `filter.audience.language` (object)
    Filter by Audience Language, You can get the languages code with our languages api end point and send the location id within an object, together with the weight percentage. The default percentage is set to 20% (0.2)
    Example: {"id":"en","weight":0.2}

  - `filter.audience.language.id` (string, required)
    Filter value id for language (e.g. "en")
    Example: "en"

  - `filter.audience.gender` (object)
    Filter by gender specific Audience, You can send the gender together with the weight percentage. The default percentage is set to 50% (0.5)
    Example: {"id":"MALE","weight":0.5}

  - `filter.audience.gender.id` (string, required)
    Filter value id for gender
    Enum: "MALE", "FEMALE"

  - `filter.audience.age` (array)
    Filter by Audience age. You can send the age together with the weight percentage. The default percentage is set to 30% (0.3)
    Example: [{"id":"18-24","weight":0.3},{"id":"65-","weight":0.3}]

  - `filter.audience.age.id` (string, required)
    Filter value id for age
    Enum: "13-17", "18-24", "25-34", "35-44", "45-64", "65-"

  - `filter.audience.ageRange` (object)
    Filter by audience age range. You can send the age range together with the weight percentage. The default percentage is set to 30% (0.3). You can't send both age and ageRange together.
    Example: {"min":"18","max":"24","weight":0.3}

  - `filter.audience.ageRange.min` (string)
    Minimum audience age.
    Enum: "13", "18", "25", "35", "45", "65"

  - `filter.audience.ageRange.max` (string)
    Maximum audience age.
    Enum: "17", "24", "34", "44", "64"

  - `filter.audience.ageRange.weight` (number)
    Weight of audience age range.
    Example: 0.3

## Response 200 fields (application/json):

  - `error` (boolean)
    If there is an error

  - `total` (number, required)
    Number of results
    Example: 2

  - `lookalikes` (array, required)
    Lookalikes

  - `lookalikes.userId` (string, required)
    User Id
    Example: "173560420"

  - `lookalikes.profile` (object, required)
    Profile info of influencer

  - `lookalikes.profile.userId` (string)
    User id of the influencer
    Example: "173560420"

  - `lookalikes.profile.fullname` (string)
    Full name of Influencer
    Example: "Instagram"

  - `lookalikes.profile.username` (string, required)
    Username of Influencer
    Example: "instagram"

  - `lookalikes.profile.url` (string, required)
    Profile URL
    Example: "https://www.instagram.com/instagram/"

  - `lookalikes.profile.picture` (string, required)
    Profile Picture
    Example: "https://imgigp.modash.io/?https://scontent-arn2-1.cdninstagram.com/t51.2885-19/s320x320/22159423_1794482210565499_9190891265074397184_n.jpg"

  - `lookalikes.profile.followers` (number, required)
    Follower count
    Example: 313560626

  - `lookalikes.profile.engagements` (number, required)
    Engagements
    Example: 857994

  - `lookalikes.profile.engagementRate` (number, required)
    Engagement rate
    Example: 0.0027362938100525414

  - `lookalikes.profile.averageViews` (number, required)
    Example: 98124

  - `lookalikes.profile.handle` (string)
    Unique and short YouTube channel identifier
    Example: "tseries"

  - `lookalikes.match` (object)
    Sorting match info

  - `lookalikes.match.code` (string, required)
    Code of the sorting value that was used for matching e.g when sorting by audienceAge it could be 25-34
    Example: "25-34"

  - `lookalikes.match.weight` (number, required)
    Weight of the sorting value that was matched
    Example: 0.32

  - `directs` (array, required)
    Directs

  - `isExactMatch` (boolean, required)
    Are the results exactly matching the filters you provided? If we don't find exact results then we try to show similar users by automatically removing some filters for you.
    Example: true





# Search Influencers

Get a list of influencers that match your filters.
			A successful request costs 0.01 credits per search result, with a typical request totaling 0.15 credits for up to 15 results per page
			Filtering and adding match data:Expand to see additional information
			When filtering by one or more fields, it is advisable to include these same fields in the sorting process. This ensures that you can retrieve the match information associated with each result.
			By adding the filtering fields to the sorting criteria, you gain access to detailed match info for every result obtained.
			Example: If you want to filter by age you would also sort the results by age:
			
			{
				&nbsp; "sort": { "direction": "desc", "field": "audience_age", "sortedValue": "18-24", "value": "18-24" },
				&nbsp; "page": 0,
				&nbsp; "filter": { "audience": { "age": [{"id": "18-24", "weight": 0.3}] } }
			}
			
			You will retrieve match info that will provide details on how well each result matches the filtering criteria. The match info should include two fields: 
			&nbsp;-code: represents the filtering field that corresponds to the result 
			&nbsp;-percentage: quantifies the degree of similarity or relevance 
			Audience filters support weights:Expand to see additional informationWeights allow you to set a threshold for the chosen filter. If you remove the weight - we will apply the default weight per filter.
			Using multiple filters simultaneously results in a logical AND, while applying multiple objects into an array (works with location and age) are applied as a logical OR
			Example: If you want at least 30% of the audience to be at the age of 18-24, you can use the weight property of 0.3. We recommend starting with low weight and gradually increasing the percentage. You can find the default thresholds in the notes of each filter.
			Expand the filter object below to see all available options.
			

Endpoint: POST /tiktok/search
Security: accessToken

## Request fields (application/json):

  - `page` (number)
    Page number

  - `calculationMethod` (string)
    If specified, this indicates the method used to compute average-based metrics, such as average number of likes, comments, shares, etc.
    Enum: "median", "average"

  - `sort` (object)
    Sorting

  - `sort.field` (string, required)
    Note: The following sort options are available only when the corresponding filter is applied:       . 
		Sorting field in which order you want to get the results.
    Enum: "engagements", "followers", "engagementRate", "keywords", "audienceGeo", "audienceLang", "audienceGender", "audienceAge", "relevance", "followersGrowth", "views", "shares", "saves", "likesGrowth"

  - `sort.value` (number)
    Only required for  sorting.
    Example: 123

  - `sort.direction` (string)
    Sorting direction
    Enum: "asc", "desc"

  - `filter` (object)

  - `filter.influencer` (object)

  - `filter.influencer.followers` (object)
    We round followers value in the filter: whenever it's below 5k, we round it to the nearest thousand (4123 -> 4000; 4800-> 5000); when it's over 5k, we round it to the nearest 5,000 (27k -> 25k; 28k -> 30k).
    Example: {"min":20000,"max":70000}

  - `filter.influencer.followers.min` (number)
    Minimum follower count.
    Example: 20000

  - `filter.influencer.followers.max` (number)
    Maximum follower count.
    Example: 70000

  - `filter.influencer.engagementRate` (number)
    Minimum engagement rate.
    Example: 0.02

  - `filter.influencer.location` (array)
    Filter by Influencer Location, You can get the locations with our locations api end point and send location ids in an array.
    Example: [148838,62149,80500,1428125,304716]

  - `filter.influencer.language` (string)
    Filter by Influencer Language, You can get the languages code with our languages api end point.
    Example: "en"

  - `filter.influencer.lastposted` (number)
    Idenitfy influencers based on when they last posted. The number represents days and should be >= 30.
    Example: 90

  - `filter.influencer.relevance` (array)
    Filter by topic of influencers posts or by similarity of topic to other influencer. For example "#cars #audi @topgear" means "Writing about #cars and #audi, has similar topic as @topgear account." You can only enter 100 usernames.
    Example: ["#cars","@topgear"]

  - `filter.influencer.audienceRelevance` (array)
    Filter by similarity of influencer's audience to another influencer's audience. For example "@topgear" means "Has audience similar to @topgear account." Audience similarity means followers follow accounts with the same topics as those followed by @topgear's audience.
    Example: ["@topgear"]

  - `filter.influencer.gender` (string)
    Filter by Influencer gender.
    Enum: "MALE", "FEMALE", "KNOWN", "UNKNOWN"

  - `filter.influencer.age` (object)
    Filter by Influencer age, possible values are: 18, 25, 35, 45, 65. You have the option to utilize either the  field, the  field, or both concurrently. Any number that falls outside the accepted range will be disregarded.

  - `filter.influencer.age.min` (number)
    Minimum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.age.max` (number)
    Maximum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.followersGrowthRate` (object)
    Growth rate by followers over a period of time.
    Example: {"interval":"i6months","value":0.01,"operator":"gt"}

  - `filter.influencer.followersGrowthRate.interval` (string, required)
    Specifies the interval of time in which growth occurred.
    Enum: "i1month", "i2months", "i3months", "i4months", "i5months", "i6months"

  - `filter.influencer.followersGrowthRate.value` (number)
    Weight of growth rate.
    Example: 0.01

  - `filter.influencer.followersGrowthRate.operator` (string, required)
    Operator used for comparison.
    Enum: "gte", "gt", "lt", "lte"

  - `filter.influencer.bio` (string)
    Search influencer by their bio description and/or full name
    Example: "photos videos"

  - `filter.influencer.views` (object)
    Filter by views count

  - `filter.influencer.views.min` (number)
    Minimum views count.
    Example: 5000

  - `filter.influencer.views.max` (number)
    Maximum views count.
    Example: 10000

  - `filter.influencer.hasContactDetails` (array)
    If Influencer has contact details.

  - `filter.influencer.hasContactDetails.contactType` (string, required)
    Specifies the contact channels of an influencer.
    Enum: "bbm", "email", "facebook", "instagram", "itunes", "kakao", "kik", "lineid", "linktree", "pinterest", "sarahah", "sayat", "skype", "snapchat", "tiktok", "tumblr", "twitchtv", "twitter", "vk", "wechat", "youtube"

  - `filter.influencer.hasContactDetails.filterAction` (string)
    Defines condition enforced by the filter - "must" include, "should" include, or must "not" include.
    Enum: "must", "should", "not"

  - `filter.influencer.textTags` (array)
    Filter by influencers who have used the defined hashtags or mentions in their posts.
    Example: [{"type":"hashtag","value":"carsofinstagram"},{"type":"mention","value":"topgear"}]

  - `filter.influencer.textTags.type` (string, required)
    The type of the tag.
    Enum: "hashtag", "mention"

  - `filter.influencer.textTags.value` (string, required)
    The hashtag or mention without  or  in front of it.

  - `filter.influencer.keywords` (string)
    Identify influencers by a phrase they use within the caption of their post.
    Example: "cars"

  - `filter.influencer.isVerified` (boolean)
    Set to  to filter by verified influencers.

  - `filter.influencer.likesGrowthRate` (object)
    Growth rate by total likes over a period of time.
    Example: {"interval":"i1month","value":0.2,"operator":"gt"}

  - `filter.influencer.shares` (object)
    Filter by shares count

  - `filter.influencer.shares.min` (number)
    Minimum shares count (this value will be rounded).
    Example: 5000

  - `filter.influencer.shares.max` (number)
    Maximum shares count (this value will be rounded).
    Example: 10000

  - `filter.influencer.saves` (object)
    Filter by saves count

  - `filter.influencer.saves.min` (number)
    Minimum saves count (this value will be rounded).
    Example: 5000

  - `filter.influencer.saves.max` (number)
    Maximum saves count (this value will be rounded).
    Example: 10000

  - `filter.influencer.engagements` (object)
    Filter by engagements count

  - `filter.influencer.engagements.min` (number)
    Minimum engagements count (this value will be rounded).
    Example: 5000

  - `filter.influencer.engagements.max` (number)
    Maximum engagements count (this value will be rounded).
    Example: 10000

  - `filter.influencer.filterOperations` (array)
    Modify filter operation to use , , or . Example: Search for influencer using the keyword  AND  from the London or Female  interested in Beauty & Cosmetics.If no operator is specified, the default operator applied is the  operator.

  - `filter.influencer.filterOperations.operator` (string, required)
    Logical operations used to combine filters.Note: To use the  operator, you must apply it to at least two filters.
    Enum: "and", "or", "not"

  - `filter.influencer.filterOperations.filter` (string, required)
    Filter to apply the operation on. If  or  are specified then you can not sort by these fields.
    Enum: "followers", "engagements", "engagementRate", "lastposted", "bio", "keywords", "relevance", "language", "gender", "age", "location", "isVerified", "views", "textTags"

  - `filter.audience` (object)

  - `filter.audience.location` (array)
    Filter by Audience Location, You can get the locations with our locations api end point and send location ids in an array together with their weight percentages. The default percentage is set to 20% (0.2)
    Example: [{"id":148838,"weight":0.2},{"id":62149,"weight":0.2},{"id":80500,"weight":0.2},{"id":1428125,"weight":0.2},{"id":304716,"weight":0.2}]

  - `filter.audience.location.weight` (number)
    Weight of filter.
    Example: 0.4

  - `filter.audience.location.id` (number, required)
    Filter value id for location (e.g. 148838)

  - `filter.audience.language` (object)
    Filter by Audience Language, You can get the languages code with our languages api end point and send the location id within an object, together with the weight percentage. The default percentage is set to 20% (0.2)
    Example: {"id":"en","weight":0.2}

  - `filter.audience.language.id` (string, required)
    Filter value id for language (e.g. "en")
    Example: "en"

  - `filter.audience.gender` (object)
    Filter by gender specific Audience, You can send the gender together with the weight percentage. The default percentage is set to 50% (0.5)
    Example: {"id":"MALE","weight":0.5}

  - `filter.audience.gender.id` (string, required)
    Filter value id for gender
    Enum: "MALE", "FEMALE"

  - `filter.audience.age` (array)
    Filter by Audience age. You can send the age together with the weight percentage. The default percentage is set to 30% (0.3)
    Example: [{"id":"18-24","weight":0.3},{"id":"65-","weight":0.3}]

  - `filter.audience.age.id` (string, required)
    Filter value id for age
    Enum: "13-17", "18-24", "25-34", "35-44", "45-64", "65-"

  - `filter.audience.ageRange` (object)
    Filter by audience age range. You can send the age range together with the weight percentage. The default percentage is set to 30% (0.3). You can't send both age and ageRange together.
    Example: {"min":"18","max":"24","weight":0.3}

  - `filter.audience.ageRange.min` (string)
    Minimum audience age.
    Enum: "13", "18", "25", "35", "45", "65"

  - `filter.audience.ageRange.max` (string)
    Maximum audience age.
    Enum: "17", "24", "34", "44", "64"

  - `filter.audience.ageRange.weight` (number)
    Weight of audience age range.
    Example: 0.3

## Response 200 fields (application/json):

  - `error` (boolean)
    If there is an error

  - `total` (number, required)
    Number of results
    Example: 2

  - `lookalikes` (array, required)
    Lookalikes

  - `lookalikes.userId` (string, required)
    User Id
    Example: "173560420"

  - `lookalikes.profile` (object, required)
    Profile info of influencer

  - `lookalikes.profile.userId` (string)
    User id of the influencer
    Example: "173560420"

  - `lookalikes.profile.fullname` (string)
    Full name of Influencer
    Example: "Instagram"

  - `lookalikes.profile.username` (string, required)
    Username of Influencer
    Example: "instagram"

  - `lookalikes.profile.url` (string, required)
    Profile URL
    Example: "https://www.instagram.com/instagram/"

  - `lookalikes.profile.picture` (string, required)
    Profile Picture
    Example: "https://imgigp.modash.io/?https://scontent-arn2-1.cdninstagram.com/t51.2885-19/s320x320/22159423_1794482210565499_9190891265074397184_n.jpg"

  - `lookalikes.profile.followers` (number, required)
    Follower count
    Example: 313560626

  - `lookalikes.profile.engagements` (number, required)
    Engagements
    Example: 857994

  - `lookalikes.profile.engagementRate` (number, required)
    Engagement rate
    Example: 0.0027362938100525414

  - `lookalikes.match` (object)
    Sorting match info

  - `lookalikes.match.code` (string, required)
    Code of the sorting value that was used for matching e.g when sorting by audienceAge it could be 25-34
    Example: "25-34"

  - `lookalikes.match.weight` (number, required)
    Weight of the sorting value that was matched
    Example: 0.32

  - `directs` (array, required)
    Directs

  - `isExactMatch` (boolean, required)
    Are the results exactly matching the filters you provided? If we don't find exact results then we try to show similar users by automatically removing some filters for you.
    Example: true


# Search Influencers

Get a list of influencers that match your filters.
			A successful request costs 0.01 credits per search result, with a typical request totaling 0.15 credits for up to 15 results per page
			Filtering and adding match data:Expand to see additional information
			When filtering by one or more fields, it is advisable to include these same fields in the sorting process. This ensures that you can retrieve the match information associated with each result.
			By adding the filtering fields to the sorting criteria, you gain access to detailed match info for every result obtained.
			Example: If you want to filter by age you would also sort the results by age:
			
			{
				&nbsp; "sort": { "direction": "desc", "field": "audience_age", "sortedValue": "18-24", "value": "18-24" },
				&nbsp; "page": 0,
				&nbsp; "filter": { "audience": { "age": [{"id": "18-24", "weight": 0.3}] } }
			}
			
			You will retrieve match info that will provide details on how well each result matches the filtering criteria. The match info should include two fields: 
			&nbsp;-code: represents the filtering field that corresponds to the result 
			&nbsp;-percentage: quantifies the degree of similarity or relevance 
			Audience filters support weights:Expand to see additional informationWeights allow you to set a threshold for the chosen filter. If you remove the weight - we will apply the default weight per filter.
			Using multiple filters simultaneously results in a logical AND, while applying multiple objects into an array (works with interests, location and age) are applied as a logical OR
			Example: If you want at least 30% of the audience to be at the age of 18-24, you can use the weight property of 0.3. We recommend starting with low weight and gradually increasing the percentage. You can find the default thresholds in the notes of each filter.
			Expand the filter object below to see all available options.
			

Endpoint: POST /instagram/search
Security: accessToken

## Request fields (application/json):

  - `page` (number)
    Page number

  - `calculationMethod` (string)
    If specified, this indicates the method used to compute average-based metrics, such as average number of likes, comments, shares, etc.
    Enum: "median", "average"

  - `sort` (object)
    Sorting

  - `sort.field` (string, required)
    Note: The following sort options are available only when the corresponding filter is applied:       . 
		Sorting field in which order you want to get the results.
    Enum: "engagements", "followers", "engagementRate", "keywords", "audienceGeo", "audienceLang", "audienceGender", "audienceAge", "relevance", "followersGrowth", "audienceInterest", "reelsPlays"

  - `sort.value` (number)
    Only required for  and  sorting.
    Example: 123

  - `sort.direction` (string)
    Sorting direction
    Enum: "asc", "desc"

  - `filter` (object)

  - `filter.influencer` (object)

  - `filter.influencer.followers` (object)
    We round followers value in the filter: whenever it's below 5k, we round it to the nearest thousand (4123 -> 4000; 4800-> 5000); when it's over 5k, we round it to the nearest 5,000 (27k -> 25k; 28k -> 30k).
    Example: {"min":20000,"max":70000}

  - `filter.influencer.followers.min` (number)
    Minimum follower count.
    Example: 20000

  - `filter.influencer.followers.max` (number)
    Maximum follower count.
    Example: 70000

  - `filter.influencer.engagementRate` (number)
    Minimum engagement rate.
    Example: 0.02

  - `filter.influencer.location` (array)
    Filter by Influencer Location, You can get the locations with our locations api end point and send location ids in an array.
    Example: [148838,62149,80500,1428125,304716]

  - `filter.influencer.language` (string)
    Filter by Influencer Language, You can get the languages code with our languages api end point.
    Example: "en"

  - `filter.influencer.lastposted` (number)
    Idenitfy influencers based on when they last posted. The number represents days and should be >= 30.
    Example: 90

  - `filter.influencer.relevance` (array)
    Filter by topic of influencers posts or by similarity of topic to other influencer. For example "#cars #audi @topgear" means "Writing about #cars and #audi, has similar topic as @topgear account." You can only enter 100 usernames.
    Example: ["#cars","@topgear"]

  - `filter.influencer.audienceRelevance` (array)
    Filter by similarity of influencer's audience to another influencer's audience. For example "@topgear" means "Has audience similar to @topgear account." Audience similarity means followers follow accounts with the same topics as those followed by @topgear's audience.
    Example: ["@topgear"]

  - `filter.influencer.gender` (string)
    Filter by Influencer gender.
    Enum: "MALE", "FEMALE", "KNOWN", "UNKNOWN"

  - `filter.influencer.age` (object)
    Filter by Influencer age, possible values are: 18, 25, 35, 45, 65. You have the option to utilize either the  field, the  field, or both concurrently. Any number that falls outside the accepted range will be disregarded.

  - `filter.influencer.age.min` (number)
    Minimum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.age.max` (number)
    Maximum influencer age.
    Enum: 18, 25, 35, 45, 65

  - `filter.influencer.followersGrowthRate` (object)
    Growth rate by followers over a period of time.
    Example: {"interval":"i6months","value":0.01,"operator":"gt"}

  - `filter.influencer.followersGrowthRate.interval` (string, required)
    Specifies the interval of time in which growth occurred.
    Enum: "i1month", "i2months", "i3months", "i4months", "i5months", "i6months"

  - `filter.influencer.followersGrowthRate.value` (number)
    Weight of growth rate.
    Example: 0.01

  - `filter.influencer.followersGrowthRate.operator` (string, required)
    Operator used for comparison.
    Enum: "gte", "gt", "lt", "lte"

  - `filter.influencer.bio` (string)
    Search influencer by their bio description and/or full name
    Example: "photos videos"

  - `filter.influencer.hasYouTube` (boolean)
    If Influencer has a youtube channel.

  - `filter.influencer.hasContactDetails` (array)
    If Influencer has contact details.

  - `filter.influencer.hasContactDetails.contactType` (string, required)
    Specifies the contact channels of an influencer.
    Enum: "bbm", "email", "facebook", "instagram", "itunes", "kakao", "kik", "lineid", "linktree", "pinterest", "sarahah", "sayat", "skype", "snapchat", "tiktok", "tumblr", "twitchtv", "twitter", "vk", "wechat", "youtube"

  - `filter.influencer.hasContactDetails.filterAction` (string)
    Defines condition enforced by the filter - "must" include, "should" include, or must "not" include.
    Enum: "must", "should", "not"

  - `filter.influencer.accountTypes` (array)
    Identify influencers by their Instagram account type: Regular = 1, Business = 2, Creator = 3. E.g to find business accounts use: 2
    Example: [2]

  - `filter.influencer.brands` (array)
    Filter by Influencer Brands, You can get the array of brands with our brands API endpoint and send brand ids in an array.
    Example: [1708,13]

  - `filter.influencer.interests` (array)
    Filter by Influencer Interests, You can get the array of interests with our interests api end point and send interests ids in an array.
    Example: [3,21,1,13,11,1708,7,1826]

  - `filter.influencer.keywords` (string)
    Identify influencers by a phrase they use within the caption of their post.
    Example: "supercars"

  - `filter.influencer.textTags` (array)
    Filter by influencers who have used the defined hashtags or mentions in their posts.
    Example: [{"type":"hashtag","value":"carsofinstagram"},{"type":"mention","value":"topgear"}]

  - `filter.influencer.textTags.type` (string, required)
    The type of the tag.
    Enum: "hashtag", "mention"

  - `filter.influencer.textTags.value` (string, required)
    The hashtag or mention without  or  in front of it.

  - `filter.influencer.reelsPlays` (object)
    We round reels plays value in the filter to the nearest thousand (1400 -> 1k; 1500-> 2k)

  - `filter.influencer.reelsPlays.min` (number)
    Minimum reels plays count.
    Example: 20000

  - `filter.influencer.reelsPlays.max` (number)
    Maximum reels plays count.
    Example: 50000000

  - `filter.influencer.isVerified` (boolean)
    Set to  to filter by verified influencers.

  - `filter.influencer.hasSponsoredPosts` (boolean)
    Set to  to filter by influencers who have sponsored posts. We identify sponsored posts by looking for commercial hashtags or the official paid partnership tag.

  - `filter.influencer.engagements` (object)
    Filter by engagements count. Pro tip: set  to 0 if you want to see results with hidden likes.

  - `filter.influencer.engagements.min` (number)
    Minimum engagements count (this value will be rounded).
    Example: 5000

  - `filter.influencer.engagements.max` (number)
    Maximum engagements count (this value will be rounded).
    Example: 10000

  - `filter.influencer.filterOperations` (array)
    Modify filter operation to use , , or . Example: Search for influencer using the keyword  AND  from the London or Female  interested in Beauty & Cosmetics.If no operator is specified, the default operator applied is the  operator.

  - `filter.influencer.filterOperations.operator` (string, required)
    Logical operations used to combine filters.Note: To use the  operator, you must apply it to at least two filters.
    Enum: "and", "or", "not"

  - `filter.influencer.filterOperations.filter` (string, required)
    Filter to apply the operation on. If  or  are specified then you can not sort by these fields.
    Enum: "followers", "engagements", "engagementRate", "lastposted", "bio", "keywords", "relevance", "language", "gender", "age", "location", "isVerified", "interests", "brands", "accountTypes", "hasSponsoredPosts", "textTags"

  - `filter.audience` (object)

  - `filter.audience.location` (array)
    Filter by Audience Location, You can get the locations with our locations api end point and send location ids in an array together with their weight percentages. The default percentage is set to 20% (0.2)
    Example: [{"id":148838,"weight":0.2},{"id":62149,"weight":0.2},{"id":80500,"weight":0.2},{"id":1428125,"weight":0.2},{"id":304716,"weight":0.2}]

  - `filter.audience.location.weight` (number)
    Weight of filter.
    Example: 0.4

  - `filter.audience.location.id` (number, required)
    Filter value id for location (e.g. 148838)

  - `filter.audience.language` (object)
    Filter by Audience Language, You can get the languages code with our languages api end point and send the location id within an object, together with the weight percentage. The default percentage is set to 20% (0.2)
    Example: {"id":"en","weight":0.2}

  - `filter.audience.language.id` (string, required)
    Filter value id for language (e.g. "en")
    Example: "en"

  - `filter.audience.gender` (object)
    Filter by gender specific Audience, You can send the gender together with the weight percentage. The default percentage is set to 50% (0.5)
    Example: {"id":"MALE","weight":0.5}

  - `filter.audience.gender.id` (string, required)
    Filter value id for gender
    Enum: "MALE", "FEMALE"

  - `filter.audience.age` (array)
    Filter by Audience age. You can send the age together with the weight percentage. The default percentage is set to 30% (0.3)
    Example: [{"id":"18-24","weight":0.3},{"id":"65-","weight":0.3}]

  - `filter.audience.age.id` (string, required)
    Filter value id for age
    Enum: "13-17", "18-24", "25-34", "35-44", "45-64", "65-"

  - `filter.audience.ageRange` (object)
    Filter by audience age range. You can send the age range together with the weight percentage. The default percentage is set to 30% (0.3). You can't send both age and ageRange together.
    Example: {"min":"18","max":"24","weight":0.3}

  - `filter.audience.ageRange.min` (string)
    Minimum audience age.
    Enum: "13", "18", "25", "35", "45", "65"

  - `filter.audience.ageRange.max` (string)
    Maximum audience age.
    Enum: "17", "24", "34", "44", "64"

  - `filter.audience.ageRange.weight` (number)
    Weight of audience age range.
    Example: 0.3

  - `filter.audience.interests` (array)
    Filter by Audience Interests, You can get the array of interests with our interests api end point and send interests ids in an array together with their weight percentages. The default percentage is set to 30% (0.3)
    Example: [{"id":1708,"weight":0.2},{"id":13,"weight":0.2},{"id":3,"weight":0.2},{"id":21,"weight":0.2},{"id":1,"weight":0.2},{"id":11,"weight":0.2},{"id":7,"weight":0.2},{"id":1826,"weight":0.2}]

  - `filter.audience.interests.id` (number, required)
    Filter value id for interests (e.g. 1708)

  - `filter.audience.credibility` (number)
    Filter by Audience Credibility. The value is the inverse of fake followers, meaning 25% fake followers would translate to 0.75 of audience credibility.
    Example: 0.75

## Response 200 fields (application/json):

  - `error` (boolean)
    If there is an error

  - `total` (number, required)
    Number of results
    Example: 2

  - `lookalikes` (array, required)
    Lookalikes

  - `lookalikes.userId` (string, required)
    User Id
    Example: "173560420"

  - `lookalikes.profile` (object, required)
    Profile info of influencer

  - `lookalikes.profile.userId` (string)
    User id of the influencer
    Example: "173560420"

  - `lookalikes.profile.fullname` (string)
    Full name of Influencer
    Example: "Instagram"

  - `lookalikes.profile.username` (string, required)
    Username of Influencer
    Example: "instagram"

  - `lookalikes.profile.url` (string, required)
    Profile URL
    Example: "https://www.instagram.com/instagram/"

  - `lookalikes.profile.picture` (string, required)
    Profile Picture
    Example: "https://imgigp.modash.io/?https://scontent-arn2-1.cdninstagram.com/t51.2885-19/s320x320/22159423_1794482210565499_9190891265074397184_n.jpg"

  - `lookalikes.profile.followers` (number, required)
    Follower count
    Example: 313560626

  - `lookalikes.profile.engagements` (number, required)
    Engagements
    Example: 857994

  - `lookalikes.profile.engagementRate` (number, required)
    Engagement rate
    Example: 0.0027362938100525414

  - `lookalikes.match` (object)
    Sorting match info

  - `lookalikes.match.code` (string, required)
    Code of the sorting value that was used for matching e.g when sorting by audienceAge it could be 25-34
    Example: "25-34"

  - `lookalikes.match.weight` (number, required)
    Weight of the sorting value that was matched
    Example: 0.32

  - `directs` (array, required)
    Directs

  - `isExactMatch` (boolean, required)
    Are the results exactly matching the filters you provided? If we don't find exact results then we try to show similar users by automatically removing some filters for you.
    Example: true
