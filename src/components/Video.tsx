import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const YouTubeEmbed = (props: { videoId: string }) => {
  const IFrameWrapper = styled(Box)({
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
  });

  const IFrame = styled('iframe')({
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  });

  return (
    <IFrameWrapper>
      <IFrame
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </IFrameWrapper>
  );
};

export const Video = (props: { videoId: string; videoTitle: string; channelId: string; channelTitle: string }) => (
  <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 1, my: 2, backgroundColor: '#eee' }}>
    <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
      {props.videoTitle}
    </Typography>

    <YouTubeEmbed videoId={props.videoId} />

    <Typography variant="caption">チャンネル名: {props.channelTitle}</Typography>
  </Box>
);
