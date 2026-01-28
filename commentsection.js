import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  Reply,
} from '@mui/icons-material';

function Comment({ comment, level = 0 }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <Box sx={{ 
      ml: level * 4,
      mt: 2,
      pl: level > 0 ? 3 : 0,
      borderLeft: level > 0 ? '2px solid' : 'none',
      borderColor: 'divider'
    }}>
      <Stack direction="row" spacing={2}>
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32,
            bgcolor: comment.user.avatarColor || 'secondary.main'
          }}
        >
          {comment.user.name.charAt(0)}
        </Avatar>
        
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2" fontWeight="600">
              {comment.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{comment.user.username} • {comment.time}
            </Typography>
          </Stack>
          
          <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
            {comment.content}
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <ThumbUp fontSize="small" />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {comment.likes}
            </Typography>
            
            <IconButton size="small">
              <ThumbDown fontSize="small" />
            </IconButton>
            
            <Button 
              size="small" 
              startIcon={<Reply />}
              onClick={() => setShowReply(!showReply)}
            >
              Reply
            </Button>
          </Stack>

          {/* Reply Input */}
          {showReply && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => {
                    // Handle reply submit
                    setReplyText('');
                    setShowReply(false);
                  }}
                >
                  Post Reply
                </Button>
                <Button 
                  size="small"
                  onClick={() => setShowReply(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Stack>

      {/* Nested Replies */}
      {comment.replies?.map((reply, index) => (
        <Comment key={index} comment={reply} level={level + 1} />
      ))}
    </Box>
  );
}

function CommentSection({ comments }) {
  return (
    <Box sx={{ mt: 3 }}>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </Box>
  );
}

export default CommentSection;