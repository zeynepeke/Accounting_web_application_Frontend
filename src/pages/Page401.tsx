

import { Link } from 'react-router-dom';

const Page401 = () => {

  return (
    <div>
      <h2>Özel içerik sayfası</h2>
      <p>Hoşgeldin yabancı, bu sayfadaki içerikleri görebilmek için kendini tanıt veya kayıtol</p>
      <Link to='/login'>Login....</Link>

    </div>
  );
};

export default Page401; 