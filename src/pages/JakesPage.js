import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import useLolData from "../hooks/useLolData";
import ChampionCard from "../components/compareChamp/ChampionCard.js";
import ItemCard from "../components/compareChamp/ItemCard.js";
import ItemDropdown from "../components/compareChamp/ItemDropdown.js";
import itemsData from "../hooks/useItemStats.js";

function JakesPage() {
  const navigate = useNavigate();
  const [aatroxLevel, setAatroxLevel] = useState(1);
  const [akaliLevel, setAkaliLevel] = useState(1);
  const [aatroxItems, setAatroxItems] = useState(Array(6).fill(""));
  const [akaliItems, setAkaliItems] = useState(Array(6).fill(""));

  const {
    data: aatroxData,
    loading: aatroxLoading,
    error: aatroxError,
  } = useLolData("Aatrox");
  const {
    data: akaliData,
    loading: akaliLoading,
    error: akaliError,
  } = useLolData("Akali");

  const handleGoBack = () => {
    navigate("/");
  };

  const handleItemSelect = (champItems, setChampItems, index, itemId) => {
    const newItems = [...champItems];
    newItems[index] = itemId;
    setChampItems(newItems);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Champion Comparison</h2>
      <Row>
        <Col md={6}>
          {aatroxLoading ? (
            <div>Loading Aatrox...</div>
          ) : aatroxError ? (
            <div>Error loading Aatrox: {aatroxError}</div>
          ) : aatroxData ? (
            <>
              <ChampionCard
                champion={aatroxData}
                level={aatroxLevel}
                setLevel={setAatroxLevel}
                otherChampion={akaliData}
                otherLevel={akaliLevel}
                isAatrox={true}
              />
              <h4 className="mt-3">Aatrox Items</h4>
              {aatroxItems.map((item, index) => (
                <ItemDropdown
                  key={index}
                  items={itemsData}
                  selectedItem={item}
                  onSelectItem={(itemId) =>
                    handleItemSelect(aatroxItems, setAatroxItems, index, itemId)
                  }
                />
              ))}
              <ItemCard
                items={aatroxItems.map((id) => itemsData[id]).filter(Boolean)}
              />
            </>
          ) : (
            <div>No data for Aatrox</div>
          )}
        </Col>
        <Col md={6}>
          {akaliLoading ? (
            <div>Loading Akali...</div>
          ) : akaliError ? (
            <div>Error loading Akali: {akaliError}</div>
          ) : akaliData ? (
            <>
              <ChampionCard
                champion={akaliData}
                level={akaliLevel}
                setLevel={setAkaliLevel}
                otherChampion={aatroxData}
                otherLevel={aatroxLevel}
                isAatrox={false}
              />
              <h4 className="mt-3">Akali Items</h4>
              {akaliItems.map((item, index) => (
                <ItemDropdown
                  key={index}
                  items={itemsData}
                  selectedItem={item}
                  onSelectItem={(itemId) =>
                    handleItemSelect(akaliItems, setAkaliItems, index, itemId)
                  }
                />
              ))}
              <ItemCard
                items={akaliItems.map((id) => itemsData[id]).filter(Boolean)}
              />
            </>
          ) : (
            <div>No data for Akali</div>
          )}
        </Col>
      </Row>

      <Button onClick={handleGoBack} className="mt-4">
        Go Back
      </Button>
    </Container>
  );
}

export default JakesPage;
