import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import DataTablesList from '../components/DataTablesList';
import Documents from '../../../api/documents/documents';

class DataTables extends Component {
  constructor(props) {
    super(props);

    this.pagination = new Meteor.Pagination(Documents, {
      name: 'documents.paginatedList',
      filters: {},
      sort: {},
      perPage: 10,
      reactive: true,
      debug: true,
    });
  }

  render() {
    const {
      pagination,
    } = this;

    return (
      <div className="Documents">
        <Row>
          <Col xs={12}>
            <div className="page-header clearfix">
              <h4 className="pull-left">React Data Grid Documents</h4>
              <Link to="/documents/new">
                <Button
                  bsStyle="success"
                  className="pull-right"
                >
                  New Document
                </Button>
              </Link>
            </div>
            <DataTablesList pagination={pagination} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DataTables;
