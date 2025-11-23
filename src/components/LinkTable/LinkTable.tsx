import { toast } from "react-toastify";
import useDeleteLink from "../../hooks/useDeleteLink";
import useGetAllLinks from "../../hooks/useGetAllLinks";
import Pagination from "../pagination/Pagination";
import { useState } from "react";
import styles from "./LinkTable.module.scss";
const LinkTable = () => {
  const { links, currentPage, setCurrentPage, totalPages, isLoading, isError } =
    useGetAllLinks();
  const { deleteMutation, isDeleting } = useDeleteLink();
  const [urlsToBeDeleted, setUrlsToBeDeleted] = useState<Array<string>>([]);
  return (
    <div className="d-flex flex-column w-100 align-items-center">
      <table className="table mt-5 w-75">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="w-100">
          {isLoading ? (
            <div className="d-flex w-100 justify-content-center align-items-center text-primary display-1 ps-5">
              Loading...
            </div>
          ) : isError ? (
            <div className="d-flex w-100 justify-content-center align-items-center text-danger">
              {" "}
              Error Loading content!
            </div>
          ) : links?.length === 0 ? (
            <div>No data found</div>
          ) : (
            links?.map((link) => (
              <tr key={link.code}>
                <td>{link.code}</td>
                <td>{link.url}</td>
                <td
                  onClick={async () => {
                    setUrlsToBeDeleted((prev) => [...prev, link.code]);

                    try {
                      await deleteMutation.mutateAsync(link.code);
                    } catch (err) {
                      console.log(err);
                      toast.error("Error deleting url!");
                    } finally {
                      setUrlsToBeDeleted((prev) =>
                        prev.filter((ele) => ele !== link.code)
                      );
                    }
                  }}
                  className={styles.cursorPointer}
                >
                  {isDeleting && urlsToBeDeleted.includes(link.code) ? (
                    <div className="spinner-border text-danger"></div>
                  ) : (
                    <span className="text-danger">Delete</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentpage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LinkTable;
