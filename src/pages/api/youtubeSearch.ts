import type { NextApiRequest, NextApiResponse } from 'next';

type youtubeApiResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: [
    {
      kind: string;
      etag: string;
      id: {
        kind: string; // "youtube#video"
        videoId: string; // "n7xLUIr3w8I" // 再生リストの場合キーはlistId
      };
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string; // 動画タイトル
        description: string; // "朗読：江戸川乱歩「幽鬼の塔」 その事件は、月明かりにそびえる五重の塔から始まりました。青年探偵が出会った、ひとりの不審な男は、大 ...",
        thumbnails: {
          default: {
            url: string;
            width: 120;
            height: 90;
          };
          medium: {
            url: string;
            width: 320;
            height: 180;
          };
          high: {
            url: string;
            width: 480;
            height: 360;
          };
        };
        channelTitle: string;
        liveBroadcastContent: string; // "none",
        publishTime: string; // "2022-01-08T12:44:29Z"
      };
    }
  ];
};

const YouTubeSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchWords } = req.query;

  const additionalConditionWords = ['朗読', '読み聞かせ', 'オーディオブック', 'audiobook', 'audio book', 'AudioBook', 'Audio Book', 'AUDIOBOOK', 'ラジオドラマ'];

  const joinedSearchWords = (searchWords as string).trim().replace(/\s/g, '+');
  const additionalConditions = `+(${additionalConditionWords.join('|')})`; //'+(朗読|読み聞かせ|オーディオブック|audiobook| .... |ラジオドラマ)';
  const searchQuery = encodeURI(joinedSearchWords + additionalConditions);
  const resFromApi = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env
      .YOUTUBE_API_KEY!}&part=snippet&maxResults=50&q=${searchQuery}`
  );

  const data = (await resFromApi.json()) as youtubeApiResult;

  const { nextPageToken } = data;

  const items = data.items
    .map((d) => {
      const videoTitle = d.snippet.title;
      const videoId = d.id.videoId;
      const channelTitle = d.snippet.channelTitle;
      const channelId = d.snippet.channelId;

      // 再生リストを除外する
      if (!videoId) return null;

      // videoTitleにadditionalConditionWordsを含まないものを除外する
      const regExp = new RegExp(additionalConditionWords.join('|'))
      const meetsAdditionalConditions = regExp.test(videoTitle);
      if (!meetsAdditionalConditions) return null;

      return { videoId, videoTitle, channelId, channelTitle };
    })
    .filter((i) => i);

  const result = { nextPageToken, items };

  res.status(200).json(result);
};

export default YouTubeSearch;
