import React, { useState, useEffect } from "react";
import Textbox from "../controls/Textbox";
import dataNinja from "../../utilities/axios";
import GroupItem from "../GroupItem";
import { useNavigate } from "react-router-dom";

const GroupFindScreen = () => {

  const navigate = useNavigate()

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ groupItems, setGroupItems ] = useState([])

  const fetchGroups = async () => {
    const response = await dataNinja.get('/group/find', {
      params: {
        name: searchTerm
      }
    })
    console.log(response)
    setGroupItems(response.data)
  }

  useEffect(() => {
    if (searchTerm.length === 0) {
      setGroupItems([])
    }
    else {
      fetchGroups()
    }
  }, [searchTerm])

  return (
    <div>
      <div
        className="screen__header"
      >
        Find group
      </div>
      <div>
        <Textbox
          label="Group name"
          placeholder="Enter group name"
          text={searchTerm}
          handleTextChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>

        <div
          className="list"
        >
          {groupItems.map((group) => (
            <GroupItem
              key={group._id}
              name={group.name}
              image={group.image}
              onClick={() => {
                navigate('/group', { state: { groupId: group._id } });

              }}
            />
          ))}

        </div>
    </div>
  )
}

export default GroupFindScreen