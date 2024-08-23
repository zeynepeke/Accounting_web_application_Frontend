import SidebarDash from "./SidebarDash";


const ApplicationContainer : React.FC<any> = ({ children }) => {
  return (
<div className="Application-Container">
    <SidebarDash></SidebarDash>
    <main> {
    /*
    main için olan css bölümü düzenlenirse bütüns ayfalar eşit boyura gelecektir
    mainin düzenlediği bütün css leri bulup application conteiner .css oluştur 
    kalan yerlerden sil
    * */
    }
        {children}
    </main>
</div>

  );

};


export default ApplicationContainer;