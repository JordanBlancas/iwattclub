// Placeholder queries para AppSync/GraphQL
// Estas queries se implementarán cuando conectes a AWS

export const DEVICE_SUMMARY_QUERY = `
  query DeviceSummary($deviceId: ID!) {
    deviceSummary(deviceId: $deviceId) {
      energy_kWh_24h
      peakW
      pf_avg
      lastUpdated
    }
  }
`;

export const HISTORICAL_READINGS_QUERY = `
  query HistoricalReadings($deviceId: ID!, $startTime: AWSDateTime!, $endTime: AWSDateTime!) {
    deviceReadings(deviceId: $deviceId, startTime: $startTime, endTime: $endTime) {
      items {
        ts
        powerW
        voltageV
        pf
      }
    }
  }
`;

export const DEVICE_LIST_QUERY = `
  query DeviceList($userId: ID!) {
    userDevices(userId: $userId) {
      items {
        id
        name
        location
        status
        lastSeen
      }
    }
  }
`;

export const DEVICE_QUERY = `
  query Device($deviceId: ID!) {
    device(id: $deviceId) {
      id
      name
      location
      status
      lastSeen
      owner {
        id
        name
      }
    }
  }
`;

export const COMMUNITY_STATS_QUERY = `
  query CommunityStats {
    communityStats {
      totalMembers
      totalEnergy_kWh
      co2Saved_kg
    }
    
    userRanking {
      position
      totalUsers
    }
  }
`;

// Subscriptions para tiempo real
export const ON_NEW_MEASUREMENT_SUBSCRIPTION = `
  subscription OnNewMeasurement($deviceId: ID!) {
    onNewMeasurement(deviceId: $deviceId) {
      ts
      powerW
      voltageV
      pf
      deviceId
    }
  }
`;

export const ON_DEVICE_STATUS_CHANGE_SUBSCRIPTION = `
  subscription OnDeviceStatusChange($userId: ID!) {
    onDeviceStatusChange(userId: $userId) {
      deviceId
      status
      lastSeen
    }
  }
`;

// Mutations para acciones
export const UPDATE_DEVICE_MUTATION = `
  mutation UpdateDevice($input: UpdateDeviceInput!) {
    updateDevice(input: $input) {
      id
      name
      location
      status
    }
  }
`;

export const JOIN_CHALLENGE_MUTATION = `
  mutation JoinChallenge($challengeId: ID!) {
    joinChallenge(challengeId: $challengeId) {
      id
      status
      joinedAt
    }
  }
`;