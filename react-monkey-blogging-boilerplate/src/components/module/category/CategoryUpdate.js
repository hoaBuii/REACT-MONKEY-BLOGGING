import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { Field } from "../../field";
import { Label } from "../../label";
import { Input } from "../../input";
import FieldCheckboxes from "../../field/FieldCheckboxes";
import Radio from "../../checkbox/Radio";
import { Button } from "../../button";
import { categoryStatus } from "../../../utils/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }

    fetchData();
  }, [categoryId, reset]);

  const [loading, setLoading] = useState(false);
  const watchStatus = watch("status");

  const handleUpdateCategory = async (values) => {
    setLoading(true);
    const colRef = doc(db, "categories", categoryId);

    try {
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Update category successfully!");
      navigate("/manage/category");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!categoryId) return null;

  return (
    <Fragment>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto max-w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Update Category
        </Button>
      </form>
    </Fragment>
  );
};

export default CategoryUpdate;
