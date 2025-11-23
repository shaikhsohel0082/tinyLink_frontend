import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../service/link/deleteLinks";

const useDeleteLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      return await deleteLink(code);
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return {
    isDeleting: mutation.isPending,
    isErrorDeleting: mutation.isError,
    deleteMutation: mutation,
  };
};

export default useDeleteLink;
