import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  ChatBubble,
  Share,
  Bookmark,
  MoreVert,
} from '@mui/icons-material';
import CommentSection from './CommentSection';

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In real app: Send to backend
      console.log('New comment:', comment);
      setComment('');
    }
  };

  return (
    <Card sx={{ 
      mb: 3, 
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        boxShadow: 8
      }
    }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ 
              bgcolor: post.user.avatarColor || 'primary.main',
              fontWeight: 'bold'
            }}
          >
            {post.user.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="600">
              {post.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{post.user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
              {post.time}
            </Typography>
          </Box>
        }
        subheader={
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {post.tags.map((tag, index) => (
              <Chip 
                key={index}
                label={tag}
                size="small"
                sx={{ 
                  bgcolor: 'rgba(0, 162, 255, 0.1)',
                  color: 'primary.main',
                  fontWeight: 500
                }}
              />
            ))}
          </Stack>
        }
      />

      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {post.content}
        </Typography>
        
        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="Post"
            sx={{
              width: '100%',
              borderRadius: 2,
              mt: 2,
              maxHeight: 400,
              objectFit: 'cover'
            }}
          />
        )}
      </CardContent>

      <CardActions sx={{ px: 3, pb: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          <Button 
            startIcon={<ThumbUp />} 
            onClick={handleLike}
            sx={{ color: 'text.secondary' }}
          >
            {likes}
          </Button>
          <Button 
            startIcon={<ThumbDown />} 
            onClick={handleDislike}
            sx={{ color: 'text.secondary' }}
          >
            {dislikes}
          </Button>
          <Button 
            startIcon={<ChatBubble />} 
            onClick={() => setShowComments(!showComments)}
            sx={{ color: 'text.secondary' }}
          >
            {post.comments?.length || 0} Comments
          </Button>
          <Button 
            startIcon={<Share />}
            sx={{ color: 'text.secondary' }}
          >
            Share
          </Button>
          <IconButton sx={{ ml: 'auto' }}>
            <Bookmark />
          </IconButton>
        </Stack>
      </CardActions>

      {/* Comment Input */}
      {showComments && (
        <Box sx={{ px: 3, pb: 2 }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.default'
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ mt: 1 }}
            >
              Post Comment
            </Button>
          </form>
          
          {/* Comments List */}
          <CommentSection comments={post.comments || []} />
        </Box>
      )}
    </Card>
  );
}

export default PostCard;