import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  forgotPassword,
  getSession,
  login,
  logout,
  register,
  resetPassword,
  resendVerification,
  verifyEmail,
} from './auth-client.js';

export const authQueryKey = ['auth', 'session'];

export function useAuth() {
  const queryClient = useQueryClient();
  const session = useQuery({
    queryKey: authQueryKey,
    queryFn: getSession,
    retry: false,
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: authQueryKey });
  return {
    ...session,
    user: session.data?.user ?? null,
    login: useMutation({ mutationFn: login, onSuccess: invalidate }),
    register: useMutation({ mutationFn: register, onSuccess: invalidate }),
    verifyEmail: useMutation({ mutationFn: verifyEmail, onSuccess: invalidate }),
    resendVerification: useMutation({ mutationFn: resendVerification }),
    forgotPassword: useMutation({ mutationFn: forgotPassword }),
    resetPassword: useMutation({ mutationFn: resetPassword }),
    logout: useMutation({
      mutationFn: logout,
      onSuccess: async () => {
        await queryClient.setQueryData(authQueryKey, null);
      },
    }),
  };
}
