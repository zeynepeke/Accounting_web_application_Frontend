import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";



const ProfilePage = () => {
  const auth = useAuth();
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  return (
    <div>
      <h2>Profile Page</h2>
      <p>Kendi profilini düzenle, fotoğraf ekle, bilgilerini paylaş</p>

      <div>
        <div>Adın</div>
        
        <input value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)}/>
      </div>
      <div>
        <div>Soyadın</div>
        <input value={lastName} onChange={(e) => setLastName(e.currentTarget.value)}/>
      </div>
      <button onClick={()=>{alert(`Merhaba ${firstName} ${lastName}`)}}>Kaydet</button>
    </div>
  );
};

export default ProfilePage;