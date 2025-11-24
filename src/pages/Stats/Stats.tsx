import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLinkStats } from "../../service/link/getLinkStats";
import styles from "./Stats.module.scss";
import Spinner from "../../components/Spinner";
const Stats = () => {
  const { code } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["code-link"],
    queryFn: () => {
      return getLinkStats(code + "");
    },
    enabled: code?.trim() !== "",
  });
  return (
    <div className={`${styles.wrapper}`}>
      {isLoading ? (
        <Spinner color="blue" />
      ) : isError ? (
        <div className="d-flex justify-content-center align-items-center text-danger fs-3">
          Error Loading content!
        </div>
      ) : (
        <div className={`${styles.card}`}>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span className={styles.label}>Code :</span>
            <span className="text-success w-75 text-truncate">{data?.code}</span>
          </div>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span className={`${styles.label} `}>Url :</span>
            <span className="text-success w-75 text-truncate">{data?.url}</span>
          </div>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span className={styles.label}>Total Clicks :</span>
            <span className="text-success w-75 text-truncate">{data?.clicks}</span>
          </div>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span className={styles.label}>Last Clicked Date:</span>
            {data?.lastClicked ? (
              <span className="text-success w-75 text-truncate">
                <span className="me-3">
                  {new Date(data?.lastClicked + "").toLocaleDateString()}
                </span>
                {new Date(data?.lastClicked + "").toLocaleTimeString()}
              </span>
            ) : (
               <span className="text-success">-</span>
            )}
          </div>

          <button
            className="btn btn-outline-primary w-25 align-self-center mt-3"
            onClick={() => {
              const baseUrl = import.meta.env.VITE_REDIRECT;
              window.open(`${baseUrl}/${data?.code}`, "_blank");
            }}
          >
            Test URL
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;
