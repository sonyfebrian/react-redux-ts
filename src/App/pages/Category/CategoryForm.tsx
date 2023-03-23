import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { RootState } from "../../store";
import { ApiStatus,IUpdateCategoryActionProps, ICategoryForm } from "../../types/category";
import { createCategoryAction, resetCreateListStatus, updateCategoryAction } from "./categorySlice";
import { useParams } from "react-router-dom";
import { toastError } from "../../components/ToastifyConfig";
import { useNavigate} from "react-router-dom"; 
import NavBar from "../../components/Navbar"

interface IProps {
  isEditForm?: boolean;
}


export default function CategoryForm(props: IProps) {
  const { isEditForm } = props;
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [name, setName] = useState("");

  const params = useParams();
  const { createCategoryFormStatus, updateCategoryFormStatus } = useAppSelector(
    (state: RootState) => state.category
  );

  //edit
  const categoryIdToEdit = useRef(parseInt(params.id || ""));
  const { list } = useAppSelector((state: RootState) => state.category);

  useEffect(() => {
    if (isEditForm && categoryIdToEdit.current) {
      // list of category
      const userData = list.filter((x) => x.id === categoryIdToEdit.current);
console.log(userData, "cek da")
      if (userData.length) {
        setName(userData[0].name);
       
      }
    }
  }, [isEditForm, list]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ICategoryForm= { name };

    if (name ) {
      if (isEditForm) {
        const dirtyFormData: IUpdateCategoryActionProps = {
          id: categoryIdToEdit.current,
          data,
        };
        dispatch(updateCategoryAction(dirtyFormData));
        navigator("/category")
      } else {
        const data: ICategoryForm = { name, };
        dispatch(createCategoryAction(data));
        navigator("/category")
      }
    } else {
      toastError("Please fill the form");
    }
  };


  //create
  useEffect(() => {
    if (createCategoryFormStatus === ApiStatus.success) {
      setName("");
     
      dispatch(resetCreateListStatus());
    }
  }, [createCategoryFormStatus, dispatch]);

  return (
    <>
    <NavBar />
    <main className="py-10">
    <div className="container mx-auto">
      <form className="rounded-lg bg-white p-10 shadow-lg" onSubmit={onSubmitForm}>
        <div className="mb-4 flex items-center">
          <input type="text" className="w-full rounded-lg border border-gray-400 p-2" placeholder="Name Category Product" 
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          
          />
          <input className="ml-2 rounded-lg bg-gray-500 p-2 text-white hover:bg-blue-600" 
          type="submit"
          value={isEditForm ? "Update" : "Create"}
          disabled={
            createCategoryFormStatus === ApiStatus.loading ||
            updateCategoryFormStatus === ApiStatus.loading
          }
         />
        </div>
        <div className="flex">
          <label className="mr-4">
            <input type="checkbox" className="mr-2" />
            active
          </label>
         
        </div>
      </form>
    </div>
  </main></>
  )
}
