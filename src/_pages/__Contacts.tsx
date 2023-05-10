import { useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  isActive: boolean;
};

type CreatePopupProps = {
  users: User[];
  setUsers: (users: User[]) => void;
  onClose: () => void;
};

const CreatePopup = ({ users, setUsers, onClose }: CreatePopupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = { firstName, lastName, isActive };
    setUsers([...users, newUser]); 
    setFirstName("");
    setLastName("");
    setIsActive(false);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className="border-gray-400 border rounded-lg px-3 py-2 w-full"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="border-gray-400 border rounded-lg px-3 py-2 w-full"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="status">
              Status
            </label>
            <select
              className="border-gray-400 border rounded-lg px-3 py-2 w-full"
              id="status"
              value={isActive ? "active" : "inactive"}
              onChange={(event) =>
                setIsActive(event.target.value === "active")
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Contacts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-8">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => setShowPopup(true)}
      >
        Create
      </button>
      {showPopup && (
        <CreatePopup
          users={users}
          setUsers={setUsers}
          onClose={handleClosePopup}
        />
      )}
      <ul className="mt-4">
        {users.map((user, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-500">{user.isActive ? "Active" : "Inactive"}</p>
            </div>
            <div>
              <button
                className="text-blue-500 mr-4"
                onClick={() => {
                  const editedUser = prompt(
                    "Enter the new name for this user:",
                    `${user.firstName} ${user.lastName}`
                  );
                  if (editedUser) {
                    const [firstName, lastName] = editedUser.split(" ");
                    const newUsers = [...users];
                    newUsers[index] = {
                      firstName,
                      lastName,
                      isActive: user.isActive,
                    };
                    setUsers(newUsers);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 mr-4"
                onClick={() => {
                  const newUsers = [...users];
                  newUsers.splice(index, 1);
                  setUsers(newUsers);
                }}
              >
                Delete
              </button>
              <button
                className={user.isActive ? "text-gray-500" : "text-green-500"}
                onClick={() => {
                  const newUsers = [...users];
                  newUsers[index] = {
                    ...user,
                    isActive: !user.isActive,
                  };
                  setUsers(newUsers);
                }}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default Contacts;
