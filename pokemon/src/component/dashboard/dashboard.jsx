import {
  Avatar,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./dashboard.scss";
import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Pokedex } from "./pokedex/pokedex";
import SearchIcon from "@mui/icons-material/Search";

const checkColor = {
  Normal: "#929da3",
  Fighting: "#ce416b",
  Flying: "#8fa9de",
  Poison: "#aa6bc8",
  Ground: "#d97845",
  Rock: "#c5b78c",
  Bug: "#91c12f",
  Ghost: "#5269ad",
  Steel: "#5a8ea2",
  Fire: "#ff9d55",
  Water: "#5090d6",
  Grass: "#63bc5a",
  Electric: "#f4d23c",
  Psychic: "#fa7179",
  Ice: "#73cec0",
  Dragon: "#0b6dc3",
  Dark: "#5a5465",
  Fairy: "#ec8fe6",
  Physical: "#ea551e",
  Special: "#1c4684",
  Status: "#999999",
};

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, SetSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/pokemon?per_page=${10}`)
      .then((resp) => {
        setData(resp.data.data);
        setFilterData(resp.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setFilterData([]);
        setLoading(false);
      });
  }, []);

  const assignColor = (value) => {
    const isAssing =
      Array.isArray(value) &&
      value.length > 0 &&
      value.map((item) => checkColor[item]);

    return isAssing;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    SetSearch(value);
  };

  const filterDatas = search
    ? data.filter((item) =>
        item.name.english.toLowerCase().includes(search.toLowerCase())
      )
    : filterData;

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="title">Pokedex</div>
        <div className="profile">
          <Avatar className="avatar">J</Avatar>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="search-box">
          <TextField
            className="search-field"
            placeholder="search by name"
            autoComplete="off"
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div className="cards">
          {loading ? (
            <CircularProgress size={30} />
          ) : (
            <>
              {Array.isArray(filterDatas) &&
                filterDatas.length > 0 &&
                filterDatas.map((item) => (
                  <Pokedex
                    key={item.id}
                    count={item.id}
                    img={item.image.hires}
                    name={item?.name?.english}
                    type={item.type}
                    typeColor={assignColor(item.type)}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
