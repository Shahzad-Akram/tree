import React, { useEffect, useState } from "react";
import TreeView from "react-expandable-treeview";
import ModalComponent from "../../../components/ModalComponent";
import TreeLabel from "../../../components/TreeLabel";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const HomeTree = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [modalFirst, setModalFirst] = useState(false);
  const [allSpouses, setAllSpouses] = useState([
    {
      dateOfBirth: "2022-04-21",
      dateOfDeath: "2022-04-23",
      firstName: "Spouse",
      id: 0,
      lastName: "1",
    },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [familyMember, setFamilyMember] = useState(false);
  const [edited, setEdited] = useState(null);
  const [typeId, setTypeId] = useState(null);

  const handleModalFirstClose = () => setModalFirst(false);
  const handleModalFirstShow = () => {
    setModalFirst(true);
    setFamilyMember(false);
  };

  const handleFamilyMemberClose = () => setFamilyMember(false);

  const data = [
    {
      id: 0,
      label: (
        <TreeLabel
          onClick={handleModalFirstShow}
          name="A "
          id={0}
          last="Father"
          dob="2022-04-05"
          dod="2022-04-05"
          allSpouses={allSpouses}
        />
      ),
      children: [],
      firstName: "A",
      lastname: "father",
      dob: "2022-04-05",
      dod: "2022-04-05",
    },
  ];

  const [nodes, setNodes] = useState(data);

  function remove(arr, id) {
    return arr
      .filter((el) => el.id !== id)
      .map((el) => {
        if (!el.children || !Array.isArray(el.children)) return el;
        el.children = remove(el.children, id);
        return el;
      });
  }

  const addSpouse = (array, id, data) => {
    return array.map((o) =>
      o.id === id
        ? {
            ...o,
            spouse: data?.firstName,
            spouseLName: data?.lastName,
            spouseDOB: data?.dateOfBirth,
            spouseDOD: data?.dateOfDeath,
          }
        : { ...o, children: addSpouse(o.children, id) }
    );
  };

  const editNode = (array, id, data) =>
    array.map((o) =>
      o.id === id
        ? {
            ...o,
            firstName: data?.firstName,
            lastname: data?.lastName,
            dob: data?.dateOfBirth,
            dod: data?.dateOfDeath,
          }
        : { ...o, children: editNode(o.children, id, data) }
    );

  const handleFamilyMemberShow = (id) => {
    setTypeId(id);
    if (id !== 3) {
      setModalFirst(false);
      setFamilyMember(true);
    } else {
      const removed = remove(nodes, selectedId);
      setNodes(removed);
      setModalFirst(false);
    }
  };

  const announcements = [
    {
      id: 1,
      title: "Add Child",
    },
    {
      id: 2,
      title: "Add Spouse",
    },
    {
      id: 3,
      title: "Remove Person",
    },
    {
      id: 4,
      title: "Edit Person",
    },
  ];

  const update = (array, id, object) =>
    array.map((o) =>
      o.id === id
        ? { ...o, children: [...o.children, object] }
        : { ...o, children: update(o.children, id, object) }
    );

  const onSubmit = (data1) => {
    //addChild(data);
    let uniqueId = uuidv4();
    let newNode = {
      id: uniqueId,
      label: (
        <TreeLabel
          id={uniqueId}
          onClick={handleModalFirstShow}
          name={data1?.firstName}
          last={data1?.lastName}
          dob={data1?.dateOfBirth}
          dod={data1?.dateOfDeath}
          allSpouses={allSpouses}
        />
      ),
      children: [],
      firstName: data1?.firstName,
      lastname: data1?.lastName,
      dob: data1?.dateOfBirth,
      dod: data1?.dateOfDeath,
      spouse: null,
    };
    if (typeId === 2) {
      setAllSpouses([...allSpouses, { ...data1, id: selectedId }]);
      let spouse = addSpouse(nodes, selectedId, data1);
      setNodes(spouse);
      setFamilyMember(false);
    } else if (typeId === 1) {
      const newArray = update(nodes, selectedId, newNode);
      setNodes(newArray);
      setFamilyMember(false);
    } else if (typeId === 4) {
      const edited = editNode(nodes, selectedId, data1);
      setEdited(edited);
      setNodes(edited);
      setFamilyMember(false);
    }
  };

  useEffect(() => {
    if (edited !== null) {
      setTimeout(() => {
        setNodes(edited);
      }, 3000);
    }
  }, [edited]);

  console.log("nodes", nodes, "spouses:", allSpouses, "edited", edited);

  return (
    <div>
      <ModalComponent show={modalFirst} onClose={handleModalFirstClose}>
        <div>
          <ul className="-my-5 divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="py-5">
                <div className="relative p-1 rounded-sm">
                  <h3 className="text-sm font-bold text-gray-800">
                    <button
                      onClick={() => handleFamilyMemberShow(announcement.id)}
                      type="button"
                      className=" hover:text-indigo-500 focus:outline-none font-bold"
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {announcement.title}
                    </button>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ModalComponent>

      <ModalComponent show={familyMember} onClose={handleFamilyMemberClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-5 text-lg leading-6 font-medium text-gray-900">
            Add Family Member
          </h3>
          <ul className="-my-3">
            <li className="py-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="FirstName"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName")}
                  required
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Jane"
                />
              </div>
            </li>
            <li className="py-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="LastName"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  {...register("lastName")}
                  required
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Doe"
                />
              </div>
            </li>

            <li className="py-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="dateOfBirth"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth")}
                  required
                  type="date"
                  name="dateOfBirth"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Doe"
                />
              </div>
            </li>
            <li className="py-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="dateOfDeath"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Date of Death
                </label>
                <input
                  {...register("dateOfDeath")}
                  required
                  type="date"
                  name="dateOfDeath"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Doe"
                />
              </div>
            </li>
          </ul>
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              // onClick={handleFamilyMemberClose}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </ModalComponent>
      <TreeView
        data={nodes}
        renderNode={({ label, id }) => (
          <div onClick={() => setSelectedId(id)}>{label}</div>
        )}
      />
    </div>
  );
};

export default HomeTree;
