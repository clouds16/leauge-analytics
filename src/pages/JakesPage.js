import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import useLolData from "../hooks/useLolData";
import ChampionCard from "../components/compareChamp/ChampionCard";
import ItemCard from "../components/compareChamp/ItemCard";
import ItemDropdown from "../components/compareChamp/ItemDropdown";
import itemsData from "../data/someItems.json";

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

  const renderChampionItems = (champItems, setChampItems, champName) => (
    <>
      <h4 className="mt-3 mb-2">{champName} Items</h4>
      <Row className="g-2">
        {champItems.map((itemId, index) => (
          <Col xs={4} key={index}>
            <div className="border p-1 h-100">
              <ItemDropdown
                items={itemsData}
                selectedItem={itemId}
                onSelectItem={(newItemId) =>
                  handleItemSelect(champItems, setChampItems, index, newItemId)
                }
              />
              <div className="mt-1">
                {itemId && <ItemCard items={[itemsData[itemId]]} />}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Container className="flex-grow-1 mt-3 mb-3">
        <h2 className="mb-3">Champion Comparison</h2>
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
                {renderChampionItems(aatroxItems, setAatroxItems, "Aatrox")}
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
                {renderChampionItems(akaliItems, setAkaliItems, "Akali")}
              </>
            ) : (
              <div>No data for Akali</div>
            )}
          </Col>
        </Row>
      </Container>
      <footer className="mt-auto py-2 bg-light">
        <Container>
          <Button onClick={handleGoBack}>Go Back</Button>
        </Container>
      </footer>
    </div>
  );
}

export default JakesPage;
