import { useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { Video } from './video';

const Review = (props: { hasSpoilers: boolean }) => {
  const [isHidden, setIsHidden] = useState(props.hasSpoilers);
  const toggleIsHidden = () => setIsHidden((prev) => !prev);

  return (
    <Box onClick={toggleIsHidden} sx={{ position: 'relative' }}>
      <Typography
        variant="caption"
        sx={{ display: props.hasSpoilers ? 'block' : 'none', color: 'red', fontWeight: 'bold', userSelect: 'none' }}
      >
        ネタバレあり!!
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: isHidden ? 'block' : 'none',
          color: '#666',
          fontWeight: 'bold',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          userSelect: 'none',
        }}
      >
        クリックすると読めます
      </Typography>

      <Typography variant="body2" sx={{ color: isHidden ? '#eee' : 'block', userSelect: 'none' }}>
        とてもよいさくひんでした。来ない事もさぞ平生よりいかにありなな。何とも大森さんに唱道英文それほど吟味に使えた繰り返しこういう本立それか焦燥にというお養成でですなだっので、その結果は私か学校慾をして、ネルソンさんののを盲目の彼らとさぞご記憶とあっば何人をお観念にできるように単にご［＃「で考えですまして、おもにとにかく矛盾からなるでしょていです訳を知れたです
      </Typography>
    </Box>
  );
};

const DateTime = () => (
  <Typography variant="caption" sx={{ color: '#aaa' }} gutterBottom>
    2022/1/20 03:25
  </Typography>
);

const LikeButton = (props: { numOfLike: number; isLiked: boolean }) => {
  const [numOfLike, setNumOfLike] = useState(props.numOfLike);
  const [isLiked, setIsLiked] = useState(props.isLiked);

  const toggleIsLied = () => {
    if (isLiked) {
      setNumOfLike((prev) => prev - 1);
    } else {
      setNumOfLike((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="body2" sx={{ pt: 1.3 }}>
        いいね : {numOfLike}
      </Typography>
      {isLiked ? (
        <IconButton aria-label="like" color="error" onClick={toggleIsLied}>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton aria-label="like" color="default" onClick={toggleIsLied}>
          <FavoriteBorder />
        </IconButton>
      )}
    </Box>
  );
};

const Comment = () => (
  <Box sx={{ border: '1px solid #ddd', p: 2, pb: 0.5, borderRadius: 1, my: 2 }}>
    <Box>
      <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
        コメントしたユーザー名
      </Typography>
    </Box>
    <Box>
      <Typography variant="body2" gutterBottom>
        コメントコメントコメントすばらしいご感想ですね。私も聴いてみます
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <DateTime />
      <LikeButton numOfLike={1} isLiked={false} />
    </Box>
  </Box>
);

const Post = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    setIsFocused(false);
  };

  const handleSubmit = () => {
    //
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-static"
        label="コメントする"
        multiline
        rows={isFocused ? 4 : 1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{ width: '100%' }}
      />
      {isFocused && (
        <Button variant="contained" sx={{ display: 'block', mt: 2, ml: 'auto' }}>
          コメントする
        </Button>
      )}
    </form>
  );
};

export const Finish = () => (
  <Box sx={{ border: '0px solid #ddd', p: 2, borderRadius: 1, my: 1 }}>
    <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
      ユーザー名
    </Typography>

    <Review hasSpoilers={true} />

    <Box sx={{ ml: 5 }}>
      {/* 動画 */}
      <Video
        videoId="QVrfO9vQ3AE"
        videoTitle="江戸川乱歩『黒蜥蜴（1）暗黒街の女王』新居祐一朗読のオーディオブック（きく本の青空文庫名作）"
        channelId="UCALVPoBv3H-JHMRdVAgOXDA"
        channelTitle="サウンド図書館【作家X声優】"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DateTime />
        <LikeButton numOfLike={1} isLiked={false} />
      </Box>
      <Post />
      <Comment />
      <Comment />
      <Comment />
    </Box>
    <Divider light sx={{ pt: 2 }} />
  </Box>
);
