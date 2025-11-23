import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink, type ICreateLink } from "../service/link/createLink";

const useCreateLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: ICreateLink) => {
      return await createLink(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    createMutation: mutation,
  };
};

export default useCreateLink;
