import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ImageInput from "./ImageInput";

function ProfileForm(props) {
  const [form, setForm] = useState({
    name: undefined,
    role: undefined,
    description: undefined,
    image: undefined,
  });

  useEffect(() => {
    if (props?.user?.id) {
      setForm({ ...form, ...props.user });
    }
  }, [props.user]);

  const handleForm = (target) => {
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <Modal
      open={props.visible}
      onOk={() => props.submit(form)}
      onCancel={props.cancel}
    >
      <div>
        <p>Name</p>
        <Input
          name="name"
          value={form.name}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
      </div>
      <div>
        <p>Role</p>
        <Input
          name="role"
          value={form.role}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
      </div>

      <div>
        <p>Institution</p>
        <Input
          name="institution"
          value={form.institution}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
      </div>

      <div>
        <p>Description (max 250 characters)</p>
        <Input.TextArea
          rows={4}
          maxLength={250}
          name="description"
          value={form.description}
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
        />
      </div>

      <div>
        <p>Image</p>
        <ImageInput handleForm={handleForm} initImage={props?.user?.image} />
      </div>
    </Modal>
  );
}

export default ProfileForm;
