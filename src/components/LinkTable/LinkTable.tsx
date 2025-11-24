import { toast } from "react-toastify";
import useDeleteLink from "../../hooks/useDeleteLink";
import useGetAllLinks from "../../hooks/useGetAllLinks";
import Pagination from "../pagination/Pagination";
import { useState } from "react";
import styles from "./LinkTable.module.scss";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
const LinkTable = () => {
  const { links, currentPage, setCurrentPage, totalPages, isLoading, isError } =
    useGetAllLinks();
  const { deleteMutation, isDeleting } = useDeleteLink();
  const [urlsToBeDeleted, setUrlsToBeDeleted] = useState<Array<string>>([]);
  const navigate = useNavigate();
  return (
    <div className={`d-flex flex-column w-100 align-items-center`}>
      <table className="table mt-5 w-75 table-hover">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={`${styles.tableBody}`}>
          {isLoading ? (
          <div className="d-flex w-100 justify-content-end pt-lg-5 px-3 mb-lg-5">
            <Spinner color="blue" background="transparent"/>
          </div>
          ) : isError ? (
            <div className="d-flex w-100 justify-content-center align-items-center text-danger">
              {" "}
              Error Loading content!
            </div>
          ) : links?.length === 0 ? (
            <div className={`${styles.noData}`}>No data found</div>
          ) : (
            links?.map((link) => (
              <tr
                key={link.code}
                onClick={() => {
                  navigate(`/code/${link.code}`);
                }}
                className={styles.tableRow}
              >
                <td className="text-truncate">{link.code}</td>
                 <td className="text-truncate">{link.url}</td>
                <td
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
      {totalPages > 1 && (
        <Pagination
          currentpage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default LinkTable;
