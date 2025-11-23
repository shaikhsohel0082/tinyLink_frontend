import { useNavigate } from "react-router-dom";
import LinkTable from "../../components/LinkTable/LinkTable";
import styles from "./Dashboard.module.scss";
import FormData from "../../components/formData/FormData";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Dashboard;
