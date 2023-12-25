import React, { Fragment, useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../field";
import { Label } from "../../label";
import { Input } from "../../input";
import { useAuth } from "../../../contexts/auth-context";
import { useForm } from "react-hook-form";
import Button from "../../button/Button";
import slugify from "slugify";
import { postStatus } from "../../../utils/constants";
import Radio from "../../checkbox/Radio";
import FieldCheckboxes from "../../field/FieldCheckboxes";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import ImageUpload from "../../image/ImageUpload";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import Toggle from "../../toggle/Toggle";
import { db } from "../../../firebase/firebase-config";
import Dropdown from "../../dropdown/Dropdown";
import Option from "../../dropdown/Option";
import List from "../../dropdown/List";
import Select from "../../dropdown/Select";
import { toast } from "react-toastify";

const storage = getStorage();

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      // const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(colRef);
      let result = [];

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(result);
      // console.log("getData ~ result", result);
    }

    getData();
  }, []);

  const addPostHandler = async (values) => {
    setLoading(true);

    try {
      const cloneValues = { ...values };

      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");

      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        hot: false,
        image: "",
      });
      setImage("");
      setProgress(0);
      setSelectCategory("");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item.name);
  };

  return (
    <Fragment>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>

          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                placeholder={`${selectCategory || "Select category"}`}
              ></Select>
              <List>
                {categories &&
                  categories.length > 0 &&
                  categories.map((item) => (
                    <Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selectCategory && (
              <span className="inline-block p-4 rounded-lg bg-gray-200t text-sm">
                {selectCategory}
              </span>
            )}
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto max-w-[250px]"
          isLoading={loading}
          disabled={loading}
          kind="primary"
        >
          Add new post
        </Button>
      </form>
    </Fragment>
  );
};

export default PostAddNew;
