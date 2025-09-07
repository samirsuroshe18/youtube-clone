import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "../components/VideoPlayer";
import Preloader from "../components/Preloader";
import useCurrentUser from "../hooks/useCurrentUser";
import ErrorPage from "../components/ErrorPage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { data, error, loading } = useCurrentUser();
  const navigate = useNavigate();
  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (data) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <VideoPlayer />
      </>
    );
  } else {
    navigate("/login");
  }
}
