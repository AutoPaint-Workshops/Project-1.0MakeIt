import { useContext, useState } from 'react';
import { BtnSubmitStyled } from '../../../components/StyledButtons';
import { BtnStateStyle, NavLinkEdit } from './StylesComponentsProfiles';
import { AuthContext } from '../../../auth/context/AuthContext';
import { Button, Form } from 'react-bootstrap';

export const Details = () => {
  const { user } = useContext(AuthContext);
  const active = false;
  const [onEdit, setOnEdit] = useState(active);

  function activate(event) {
    setOnEdit(!onEdit);
  }

  return (
    <div
      className="m-auto border rounded px-3 pt-2 pb-3"
      style={{ width: '500px' }}
    >
      <span className="fw-bold fs-5 mx-auto border-bottom">
        Informacion de empresa
      </span>
      <div className="mt-4 text-nowrap">
        <div className="d-flex justify-content-around py-1 align-items-center">
          <span className="w-50">NIT</span>
          <span className="w-50">
            {!onEdit ? (
              user.data.document
            ) : (
              <Form.Control type="text" placeholder={user.data.document} />
            )}
          </span>
        </div>
        <div className="d-flex justify-content-around py-1 align-items-center">
          <span className="w-50">Pagina Web</span>
          <span className="w-50">
            {!onEdit ? (
              'companyWeb.com.co'
            ) : (
              <Form.Control type="text" placeholder="companyWeb.com.co" />
            )}
          </span>
        </div>
        <div className="d-flex justify-content-around py-1 align-items-center">
          <span className="w-50">Camara y comercio</span>
          <span className="w-50">
            {!onEdit ? 'document.pdf' : <Form.Control type="file" size="sm" />}
          </span>
        </div>

        <div className="d-flex justify-content-around mt-4">
          {!onEdit ? (
            <Button className="w-25" onClick={activate}>
              Editar
            </Button>
          ) : (
            <BtnSubmitStyled
              className="w-25"
              onClick={() => {
                setOnEdit(false);
              }}
            >
              Confirmar
            </BtnSubmitStyled>
          )}
        </div>
      </div>
    </div>
  );
};
