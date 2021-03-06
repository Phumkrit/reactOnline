import React from "react";
import { Table,Image,Badge,Spinner,Button } from "react-bootstrap";
import axios from "axios";
import { IoIosPlay } from "react-icons/io";
import { addtocart } from "/React-Course/git101/react-online/src/redux/action/cartAction";
import { useSelector, useDispatch} from 'react-redux'

function ProductPage() {
  const [product, setProduct] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [error, seterror] = React.useState(null);

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartReducer.cart)
  const total = useSelector((state) => state.cartReducer.total)

  const getData = async () => {
    try 
    {
        setloading(true)
        const resp = await axios.get(
            "https://api.codingthailand.com/api/course"
          );
          //console.log(resp.data)
          setProduct(resp.data.data)
    } 
    catch (error) 
    {
        seterror(error)
    } 
    finally 
    {
        setloading(false)
    }
    //setProduct(resp.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (loading === true){
      return(
          <div className="text-center mt-5">
        <Spinner animation="border" variant="danger" />
        </div>
      )
  }

  if (error){
      return(
          <div className="text-center mt-5 text-danger">
              <h4>Error from API, Plese try again</h4>
              <p>{error.response.data.message}</p>
          </div>
      )
  }

  const addCart = (p) => {
      const product = {
        id: p.id,
        name: p.title,
        price: p.view,
        qty: 1
      }


      dispatch(addtocart(product, cart))
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4">
          <h2>Product Page</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Detail</th>
                <th>Create Date</th>
                <th>View</th>
                <th>Picture</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
            {

                product.map((p, index) => {
                    return (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.title}</td>
                            <td>{p.detail}</td>
                            <td>{p.date}</td>
                            <td><Badge variant="primary">{p.view}</Badge></td>
                            <td><Image src={p.picture} rounded width={60}/></td>
                            <td><Button href={`/detail/${p.id}/title/${p.title}`} variant="dark">Click ME <IoIosPlay/> </Button>
                            <Button variant="outline-warning" className="ml-2" onClick={() => addCart(p)}>BUY</Button>
                            
                            </td>
                        </tr>
                    )

                })
            }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
