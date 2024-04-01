import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useGetMe } from '../../hooks/useGetMe';
import { UploadFile } from '@mui/icons-material';
import { API_URL } from '../../constants/urls';
import { snackVar } from '../../constants/snack';

interface IProfileProps {}

export function Profile({}: IProfileProps) {
  const { data } = useGetMe();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append('file', file as Blob);
      const res = await fetch(`${API_URL}/users/image`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      snackVar({ message: 'Image uploaded', severity: 'success' });
    } catch (error) {
      snackVar({ message: 'Error uploading file', severity: 'error' });
    }
  }

  return (
    <>
      <Stack
        spacing={6}
        sx={{ marginTop: '2.5rem', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant='h1'>{data?.me.username}</Typography>
        <Avatar
          alt='Remy Sharp'
          sx={{ width: 256, height: 256 }}
          src={data?.me.imageUrl}
        />
        <Button
          component='label'
          variant='contained'
          size='large'
          startIcon={<UploadFile />}
        >
          Upload Image
          <input type='file' hidden onChange={handleUpload} />
        </Button>
      </Stack>
    </>
  );
}
