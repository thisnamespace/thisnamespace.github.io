import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { useState, FormEvent, useCallback } from 'react';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // Validate form
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);

      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:info@thisnamespace.com?subject=${subject}&body=${body}`;

      // Open user's email client
      window.location.href = mailtoLink;

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setIsSubmitting(false);
      }, 100);
    },
    [formData]
  );

  const handleChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.default',
        px: { xs: 2, sm: 3 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          gutterBottom
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #06b6d4 30%, #64748b 100%)'
                : 'linear-gradient(135deg, #0e7490 30%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Get In Touch
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '700px', mx: 'auto' }}
        >
          Have a question or want to work together? I'd love to hear from you
        </Typography>
        <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={{ xs: 3, sm: 3.5 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange('message')}
                  error={!!errors.message}
                  helperText={errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: { xs: 1.5, sm: 1.75 },
                    borderRadius: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    bgcolor: 'primary.main',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    },
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
