import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Logout from "../components/Log/Logout";
import WeatherWidget from "../components/widget/WeatherWidget";
import MusicWidget from "../components/widget/MusicWidget";
import EconomyWidget from "../components/widget/EconomyWidget";
import { UidContext } from "../components/AppContext";

import "../styles/Style.css";

const Dashboard = () => {
  const uid = useContext(UidContext);
  const [widgets, setWidgets] = useState({});
  const [showAddWidgets, setShowAddWidgets] = useState(false);

  const addWidget = (widgetType) => {
    const id = uuidv4();
    let newWidget;
    switch (widgetType) {
      case "weather":
        newWidget = <WeatherWidget key={id} id={id} onSave={handleSave} />;
        break;
      case "music":
        newWidget = <MusicWidget key={id} id={id} onSave={handleSave} />;
        break;
      case "economy":
        newWidget = <EconomyWidget key={id} id={id} onSave={handleSave} />;
        break;
      default:
        return;
    }
    setWidgets({ ...widgets, [id]: newWidget });
    saveWidgetToDatabase(id, widgetType);
  };

  const saveWidgetToDatabase = async (id, widgetType) => {
    const widgetData = {
      widget: {
        id: id,
        type: widgetType,
        input1: "",
        input2: "",
        intervalTime: 5,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/user/${uid}/widget`,
        widgetData
      )
      .then((response) => {
        console.log("Réponse de la requête POST :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
      });
  };

  const handleSave = (id, type, input1, input2, intervalTime) => {
    updateWidgetInDatabase(id, type, input1, input2, intervalTime);
  };

  const updateWidgetInDatabase = async (
    id,
    widgetType,
    input1,
    input2,
    intervalTime
  ) => {
    const widgetData = {
      widget: {
        id: id,
        type: widgetType,
        input1: input1,
        input2: input2,
        intervalTime: intervalTime,
      },
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/${uid}/widget/${id}`,
        widgetData
      );
    } catch (error) {
      console.error(`Error updating widget with ID ${id}:`, error);
    }
  };

  const handleRemoveWidget = async (id) => {
    await deleteWidget(id);
    setWidgets((prevWidgets) => {
      const newWidgets = { ...prevWidgets };
      delete newWidgets[id];
      return newWidgets;
    });
  };

  const handleAddWidgetButtonClick = () => {
    setShowAddWidgets(!showAddWidgets);
  };

  const deleteWidget = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/${uid}/widget/${id}`
      );
    } catch (error) {
      console.error(`Error deleting widget with ID ${id}:`, error);
    }
  };

  const fetchUserWidgets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/${uid}/widget`
      );
      const fetchedWidgets = response.data;

      const newWidgets = fetchedWidgets.reduce((widgets, widgetData) => {
        const id = widgetData.id;
        const widgetType = widgetData.type;
        const input1 = widgetData.input1;
        const input2 = widgetData.input2;
        const intervalTime = widgetData.intervalTime;

        let widget;
        switch (widgetType) {
          case "weather":
            widget = (
              <WeatherWidget
                key={id}
                id={id}
                cityName={input1}
                Time={intervalTime}
                onSave={handleSave}
              />
            );
            break;
          case "music":
            widget = (
              <MusicWidget
                key={id}
                id={id}
                videoId={input1}
                input2={input2}
                Time={intervalTime}
                onSave={handleSave}
              />
            );
            break;
          case "economy":
            widget = (
              <EconomyWidget
                key={id}
                id={id}
                input1={input1}
                input2={input2}
                Time={intervalTime}
                onSave={handleSave}
              />
            );
            break;
          default:
            return widgets;
        }
        return { ...widgets, [id]: widget };
      }, {});

      setWidgets(newWidgets);
    } catch (error) {
      console.error("Error fetching user widgets:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchUserWidgets();
    }
  }, [uid]);

  return (
    <div>
      {uid ? (
        <>
          <div className="nav">
            <div className="add-widget-container">
              <button
                className="add-widget-button"
                onClick={handleAddWidgetButtonClick}
              >
                {showAddWidgets ? "-" : "+"}
              </button>
              {showAddWidgets && (
                <div className="add-widget-menu">
                  <button
                    className="add-widget-menu-item"
                    onClick={() => addWidget("weather")}
                  >
                    Ajouter un widget météo
                  </button>
                  <button
                    className="add-widget-menu-item"
                    onClick={() => addWidget("music")}
                  >
                    Ajouter un widget youtube
                  </button>
                  <button
                    className="add-widget-menu-item"
                    onClick={() => addWidget("economy")}
                  >
                    Ajouter un widget économique
                  </button>
                </div>
              )}
            </div>
            <Logout />
          </div>
          <div className="container">
            <div className="content">
              {Object.entries(widgets).map(([id, widget]) => (
                <Draggable bounds="parent" key={id}>
                  <div className="widget-wrapper">
                    <button
                      onClick={() => handleRemoveWidget(id)}
                      className="delete-button"
                    >
                      X
                    </button>
                    {widget}
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="login-req">
          <div className="login-req-box">
            <h1>Connecte toi</h1>
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
