import { Background } from '../../../../Layout/Table/Background/Background';
import { Contents } from '../../../../Layout/Table/Contents/Contents';

const userData = [
  { id: '1', username: 'john_doe', email: 'john@example.com', phone: '+1234567890', position: 'Manager', joinedDate: '2023-01-15' },
  { id: '2', username: 'jane_smith', email: 'jane@example.com', phone: '+1987654321', position: 'Developer', joinedDate: '2023-02-20' },
  { id: '3', username: 'bob_johnson', email: 'bob@example.com', phone: '+1122334455', position: 'Designer', joinedDate: '2023-03-10' },
  { id: '4', username: 'alice_williams', email: 'alice@example.com', phone: '+1567890123', position: 'Tester', joinedDate: '2023-04-05' },
  { id: '5', username: 'charlie_brown', email: 'charlie@example.com', phone: '+1345678901', position: 'Product Manager', joinedDate: '2023-05-20' },
];

const columns = ['username', 'email', 'phone', 'position', 'joinedDate'];

export default function UserManagement() {
  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <Background>
      <div className="container mx-auto">
        <Contents
          data={userData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Background>
  );
}
