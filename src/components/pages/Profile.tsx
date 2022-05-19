import React, { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import ButtonUI from "@mui/material/Button";
import { ThemeContext } from "../../store/utils/ThemeContext";
import { changeName, toggleProfile } from "../../store/profile/slice";
import { selectName, selectVisible } from "../../store/profile/selectors";
import { onValue, update } from "firebase/database";
import { userRef } from "src/services/firebase";

export const Profile: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const visible = useSelector(selectVisible);
  const name = useSelector(selectName);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const user = snapshot.val();
      dispatch(changeName(user.name || ""));
    });
  }, []);

  const handleChangeName = async () => {
    update(userRef, {
      name: value,
    });
  };

  return (
    <>
      <h2>Profile</h2>
      <div>
        <p>{theme === "light" ? "🌞" : "🌙"} </p>
        <button onClick={toggleTheme}>change theme</button>
      </div>
      <hr />
      <div>
        <p>{name}</p>
        <input type="checkbox" checked={visible} />
        <button onClick={() => dispatch(toggleProfile())}>
          change visible
        </button>
        <br />
        <input
          className="input"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ButtonUI
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
          onClick={handleChangeName}
        >
          change name
        </ButtonUI>
      </div>
    </>
  );
};
