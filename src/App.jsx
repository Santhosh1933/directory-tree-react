import React, { useState } from 'react'
import { explore } from './explore'
import { FaFolder } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { AiTwotoneFolderAdd } from "react-icons/ai";
import { AiTwotoneFileAdd } from "react-icons/ai";

export default function App() {

  const [dir, setDir] = useState(explore);
  const [isAdd, setIsAdd] = useState({
    show: false,
    folderName: "",
    isFolder: false
  });
  const [inputValue, setInputValue] = useState("");

  const Add = (folderName, forAdd = false, forFolder = true) => {

    const recursive = (dir) => {
      dir.map((data, i) => {
        if (data.name == folderName) {
          console.log(data);
          if (forAdd) {
            if (forFolder) {
              const newFolder = {
                name: inputValue,
                isFolder: true,
                items: []
              };
              data.items.push(newFolder);
              setDir((prevDir) => ({ ...prevDir }));
              setIsAdd({
                show: false,
                folderName: '',
                isFolder: false
              })
              setInputValue('')
            } else {
              const newFile = {
                name: inputValue,
                isFolder: false,
                items: []
              };
              data.items.push(newFile);
              setDir((prevDir) => ({ ...prevDir }));
              setIsAdd({
                show: false,
                folderName: '',
                isFolder: false
              })
              setInputValue('')
            }
          } else {
            setIsAdd({
              show: true,
              folderName: data.name,
              isFolder: forFolder
            })
          }

        } else {
          if (data.isFolder) {
            recursive(data.items)
          }
        }
      })
    }
    recursive(dir.items)

  }


  const render = (folder, level = 0) => {
    return (
      <ul>
        {folder.map((data, i) => {
          return (
            <li key={i} style={{ listStyle: 'none' }}>
              {data.isFolder ?
                <div style={{ gap: "1rem" }}>
                  <p style={{ display: 'flex', gap: "1rem", }}><FaFolder color='brown' />{data.name}<div style={{ display: 'flex', gap: "1rem" }}>
                    <button style={{
                      background: "none",
                      border: "none",
                      cursor: 'pointer'
                    }} onClick={() => {
                      Add(data.name, false, true)
                    }}><AiTwotoneFolderAdd size={22} /></button>
                    <button style={{
                      background: "none",
                      border: "none",
                      cursor: 'pointer'
                    }} onClick={() => {
                      Add(data.name, false, false)
                    }} ><AiTwotoneFileAdd size={22} /></button>
                  </div>
                  </p>
                  {isAdd.show && isAdd.folderName == data.name && <input type='text' onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      Add(data.name, true, isAdd.isFolder)
                    } else {
                      setInputValue(e.target.value);
                    }
                  }} />}
                  {render(data.items, level + 1)}
                </div> :
                <p style={{ display: 'flex', gap: "1rem", }}><FaFile color='red' />
                  {data.name}</p>
              }
            </li>
          )
        })}
      </ul>
    )
  }


  return (
    <div>
      {render(dir.items)}
    </div>
  )
}
