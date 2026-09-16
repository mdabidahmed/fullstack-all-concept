import type { Topic } from "../../types";

export const azureRegionsAvailabilityZonesTopic: Topic = {
  id: "azure-regions-availability-zones",
  title: "Regions, Availability Zones & Geographies",
  category: "Azure Fundamentals",
  shortExplanation: `Azure's physical infrastructure has a hierarchy similar to AWS's, with one extra layer:

- A **Region** is a set of datacenters in one geographic area
- A **geography** groups multiple Regions (e.g. "United States") for data-residency boundaries
- **Availability Zones** are physically separate datacenters within a Region, used for high availability
- A **Region pair** links two Regions in the same geography for disaster recovery`,
  longExplanation: `Azure's infrastructure hierarchy mirrors AWS's Region/Availability Zone model closely, with the addition of "geographies" as an explicit compliance and data-residency boundary above Regions.

- **Regions** — a Region is a set of datacenters within a defined perimeter, connected by a low-latency network (e.g. "East US", "West Europe"). Most Azure services are deployed at the Region level, and resources within a Region can typically only interact directly with other resources in that same Region without extra networking configuration
- **Availability Zones** — within many (not all) Regions, Azure offers Availability Zones: physically separate datacenters, each with independent power, cooling, and networking. Spreading a workload's VMs across multiple zones protects against a single datacenter failure, just as AWS's AZs do
- **Geographies** — a geography (e.g. "United States", "Europe") is a defined area containing one or more Regions, and typically respects specific data-residency and compliance boundaries — relevant for organizations legally required to keep data within a country or continent regardless of which specific Region it lands in
- **Region pairs** — Azure pairs most Regions with another Region in the same geography (e.g. "East US" is paired with "West US"), separated by at least 300 miles where possible. Region pairs are used for planned maintenance sequencing (Azure updates one paired Region at a time) and are a natural target for disaster-recovery replication
- **Choosing a Region** — the same three drivers as any cloud provider: latency (proximity to users), compliance (data residency requirements), and service/feature availability (not every Azure service launches in every Region simultaneously)
- **Local zones and edge** — for content and workloads needing to be extremely close to end users, Azure also offers edge and CDN capabilities analogous to AWS's edge locations, though organized somewhat differently

The practical takeaway: **spread across Availability Zones for resilience within a Region, and consider Region pairs for resilience across Regions** — the same two-layer strategy AWS encourages, just with Azure's specific terminology layered on top.`,
  examples: [
    {
      id: "region-zone-hierarchy",
      title: "Region → Availability Zone → datacenter",
      summary: "The nested hierarchy of Azure's physical infrastructure.",
      code: `function App() {
  const region = {
    name: "Region: East US",
    zones: [
      { name: "Zone 1", dc: "Datacenter A" },
      { name: "Zone 2", dc: "Datacenter B" },
      { name: "Zone 3", dc: "Datacenter C" },
    ],
  };

  return (
    <div style={{ border: "2px solid #0078d4", borderRadius: 10, padding: 14 }}>
      <strong>{region.name}</strong>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {region.zones.map((z) => (
          <div key={z.name} style={{ flex: 1, padding: 10, background: "#1e293b", color: "white", borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{z.name}</div>
            <div style={{ fontSize: 12, color: "#cbd5e1" }}>{z.dc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "region-pair-failover",
      title: "Disaster recovery across a Region pair",
      summary: "East US and West US, paired for maintenance sequencing and DR.",
      code: `function App() {
  const [eastDown, setEastDown] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setEastDown((d) => !d)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}
      >
        {eastDown ? "Restore East US" : "Simulate East US regional outage"}
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: eastDown ? "#fef3c7" : "#dcfce7" }}>
          East US {eastDown && "— down"}
        </div>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: eastDown ? "#dcfce7" : "#f3f4f6" }}>
          West US (paired) {eastDown && "— now serving traffic"}
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "geography-boundary",
      title: "A geography as a data-residency boundary",
      summary: "Multiple Regions, one compliance boundary, for data that must stay within a jurisdiction.",
      code: `function App() {
  const geography = {
    name: "Geography: United States",
    regions: ["East US", "West US", "Central US", "South Central US"],
  };

  return (
    <div style={{ padding: 14, background: "#1e293b", color: "white", borderRadius: 10 }}>
      <strong>{geography.name}</strong>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        {geography.regions.map((r) => (
          <span key={r} style={{ padding: "4px 10px", background: "#0078d4", borderRadius: 999, fontSize: 12 }}>{r}</span>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
        Data can move freely between these Regions while staying within the U.S. data-residency boundary.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
