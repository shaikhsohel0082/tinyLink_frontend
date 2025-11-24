import { useNavigate } from "react-router-dom";
import LinkTable from "../../components/LinkTable/LinkTable";
import styles from "./Dashboard.module.scss";
import FormData from "../../components/formData/FormData";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
const Dashboard = () => {
  const navigate = useNavigate();
  const [isServerStarted, setIsServerStarted] = useState(() => {
    const flag = sessionStorage.getItem("serverStarted");
    if (flag === "true") {
      return true;
    } else {
      return false;
    }
  });
  const serverUrl = import.meta.env.VITE_REDIRECT;
  // start server if it is not started
  useEffect(() => {
    const startServer = async () => {
      try {
        await fetch(serverUrl);
        setIsServerStarted(true);
        sessionStorage.setItem("serverStarted", "true");
      } catch (err) {
        console.error(err);
      }
    };

    startServer();
  }, []);

  return (
    <div>
      {isServerStarted ? (
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Tinylink
            </span>
          </header>
          <main className={styles.main}>
            <FormData />
            <LinkTable />
          </main>
        </div>
      ) : (
        <div className={styles.serverDiv}>
          <h6 className="text-text-primary fs-3">
            Getting things ready for you…
          </h6>
          <Spinner color="blue" />
          <div className="mt-4">
            <span>If the server still not started click the link: </span>
            <a href={serverUrl} target="_blank">
              start server
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
